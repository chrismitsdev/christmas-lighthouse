'use server'

import type {Locale} from 'next-intl'
import {Resend} from 'resend'
import {
  email,
  flatten,
  type InferOutput,
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  regex,
  safeParse,
  string,
  transform,
  trim
} from 'valibot'
import {InternalEmail} from '@/src/components/email/internal-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const errorMessages = {
  el: {
    string: 'Πρέπει να είναι γράμματα & αριθμοί',
    nonEmpty: 'Υποχρεωτικό πεδίο',
    fullnameMinLength: 'Τουλάχιστον 2 χαρακτήρες',
    fullnameMaxLength: 'Το πολύ 50 χαρακτήρες',
    email: 'Μη έγκυρη μορφή email',
    phoneRegex: 'Μη έγκυρος αριθμός τηλεφώνου',
    messageMaxLength: 'Το πολύ 1000 χαρακτήρες'
  },
  en: {
    string: 'Must be letters & numbers',
    nonEmpty: 'Mandatory field',
    fullnameMinLength: 'At least 2 characters',
    fullnameMaxLength: 'At most 50 characters',
    email: 'Invalid email format',
    phoneRegex: 'Invalid phone number',
    messageMaxLength: 'At most 1000 characters'
  }
}

const trimmedNonEmptyString = pipe(
  string(({lang}) => errorMessages[lang as Locale].string),
  nonEmpty(({lang}) => errorMessages[lang as Locale].nonEmpty),
  trim()
).pipe

const ContactFormSchema = object({
  fullname: pipe(
    ...trimmedNonEmptyString,
    minLength(2, ({lang}) => errorMessages[lang as Locale].fullnameMinLength),
    maxLength(50, ({lang}) => errorMessages[lang as Locale].fullnameMaxLength)
  ),
  email: pipe(
    ...trimmedNonEmptyString,
    email(({lang}) => errorMessages[lang as Locale].email)
  ),
  phone: pipe(
    ...trimmedNonEmptyString,
    // Drop spaces, dashes, dots and brackets; a leading 00 means +.
    transform((input) => input.replace(/[\s\-.()]/g, '').replace(/^00/, '+')),
    // Greek numbers (10 digits, optionally +30) or any international number.
    regex(
      /^(\+30)?\d{10}$|^\+\d{8,15}$/,
      ({lang}) => errorMessages[lang as Locale].phoneRegex
    )
  ),
  message: pipe(
    ...trimmedNonEmptyString,
    maxLength(1000, ({lang}) => errorMessages[lang as Locale].messageMaxLength)
  )
})

type ContactFormData = InferOutput<typeof ContactFormSchema>
type ContactFormFieldErrors = Partial<Record<keyof ContactFormData, string>>
type ContactFormResponse =
  | {ok: null}
  | {ok: true}
  | {ok: false; reason: 'valibot-error' | 'resend-error'}

export type ContactFormActionState = ContactFormResponse & {
  data: ContactFormData
  fieldErrors: ContactFormFieldErrors
}

export async function sendContactForm(
  locale: Locale,
  _prevState: ContactFormActionState,
  formData: FormData
): Promise<ContactFormActionState> {
  // Honeypot: hidden from people, so only bots fill it in. Pretend success.
  if (formData.get('website')) {
    return {...successState}
  }

  const data = {
    fullname: (formData.get('fullname') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    phone: (formData.get('phone') as string) ?? '',
    message: (formData.get('message') as string) ?? ''
  }

  // Parse data and get result
  const result = safeParse(ContactFormSchema, data, {
    lang: locale,
    abortPipeEarly: true
  })

  // Return validation errors
  if (!result.success) {
    const flatErrors = flatten<typeof ContactFormSchema>(result.issues)

    return {
      data: result.output as typeof data,
      fieldErrors: {
        fullname: flatErrors.nested?.fullname?.[0],
        email: flatErrors.nested?.email?.[0],
        phone: flatErrors.nested?.phone?.[0],
        message: flatErrors.nested?.message?.[0]
      },
      ok: false,
      reason: 'valibot-error'
    }
  }

  // Prepare error object
  const resendErrorData: ContactFormActionState = {
    data: result.output,
    fieldErrors: {},
    ok: false,
    reason: 'resend-error'
  }

  const from = process.env.CONTACT_EMAIL_FROM
  const to = process.env.CONTACT_EMAIL_TO
  const cc = process.env.CONTACT_EMAIL_CC

  if (!from || !to) {
    console.error(
      '❌ Form submission failed: CONTACT_EMAIL_FROM or CONTACT_EMAIL_TO is not set'
    )

    return resendErrorData
  }

  // Attempt form submission
  try {
    const response = await resend.emails.send({
      from,
      to: splitAddresses(to),
      cc: cc ? splitAddresses(cc) : undefined,
      replyTo: result.output.email,
      subject: `Φόρμα επικοινωνίας - Christmas Lighthouse${subjectTag()}`,
      react: InternalEmail(result.output)
    })

    if (response.error) {
      console.error('❌ Form submission failed:', response.error)

      return resendErrorData
    }

    console.log('✅ Email sent successfully:', response.data.id)
  } catch (error) {
    console.error(
      '❌ Form submission failed:',
      error instanceof Error ? error.message : error
    )

    return resendErrorData
  }

  // Reset fields if submission was successful
  return {...successState}
}

const successState: ContactFormActionState = {
  data: {
    fullname: '',
    email: '',
    phone: '',
    message: ''
  },
  fieldErrors: {},
  ok: true
}

/**
 * Marks test emails in the subject. VERCEL_ENV (not NODE_ENV, which is
 * 'production' on preview deployments too) tells the live site apart; it is
 * unset when running locally without the Vercel env.
 */
function subjectTag(): string {
  switch (process.env.VERCEL_ENV) {
    case 'production':
      return ''
    case 'preview':
      return ' (Preview)'
    default:
      return ' (Dev mode)'
  }
}

/** Comma-separated env value to a list of addresses. */
function splitAddresses(value: string): string[] {
  return value
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
}
