'use server'

import type {Locale} from 'next-intl'
import {Resend} from 'resend'
import {
  check,
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
  trim
} from 'valibot'
import {InternalEmail} from '@/src/components/email/internal-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const ALLOWED_EMAIL_PROVIDERS = [
  '@gmail.com',
  '@icloud.com',
  '@yahoo.gr',
  '@yahoo.com',
  '@protonmail.com',
  '@outlook.com',
  '@hotmail.com'
]

const errorMessages = {
  el: {
    string: 'Πρέπει να είναι γράμματα & αριθμοί',
    nonEmpty: 'Υποχρεωτικό πεδίο',
    fullnameMinLength: 'Τουλάχιστον 2 χαρακτήρες',
    fullnameMaxLength: 'Το πολύ 50 χαρακτήρες',
    email: 'Μη έγκυρη μορφή email',
    emailProviders: `Μη αποδεκτός πάροχος email (Αποδεκτοί πάροχοι: ${ALLOWED_EMAIL_PROVIDERS.join(', ')})`,
    phoneRegex:
      'Μη έγκυρος αριθμός (πρέπει να ξεκινά με 69 και να έχει 10 ψηφία)',
    messageMaxLength: 'Το πολύ 1000 χαρακτήρες'
  },
  en: {
    string: 'Must be letters & numbers',
    nonEmpty: 'Mandatory field',
    fullnameMinLength: 'At least 2 characters',
    fullnameMaxLength: 'At most 50 characters',
    email: 'Invalid email format',
    emailProviders: `Email provider not accepted (Accepted providers: ${ALLOWED_EMAIL_PROVIDERS.join(', ')})`,
    phoneRegex: 'Invalid mobile number (must start with 69 and have 10 digits)',
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
    email(({lang}) => errorMessages[lang as Locale].email),
    check(
      (input) =>
        ALLOWED_EMAIL_PROVIDERS.some((provider) => input.endsWith(provider)),
      ({lang}) => errorMessages[lang as Locale].emailProviders
    )
  ),
  phone: pipe(
    ...trimmedNonEmptyString,
    regex(/^69\d{8}$/, ({lang}) => errorMessages[lang as Locale].phoneRegex)
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

  // Attempt form submission
  console.log('Attempting to send email for:', result.output.email)

  try {
    const response = await resend.emails.send({
      from: 'The Christmas Lighthouse <info@moccaliving.com>',
      react: InternalEmail(result.output),
      ...(process.env.NODE_ENV === 'production'
        ? {
            subject: 'Φόρμα επικοινωνίας - Christmas Lighthouse',
            to: 'mokalis@gmail.com',
            cc: 'chrismits88@gmail.com'
          }
        : {
            subject: 'Φόρμα επικοινωνίας - Christmas Lighthouse (Dev mode)',
            to: 'chrismits88@gmail.com'
          })
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
  return {
    data: {
      fullname: '',
      email: '',
      phone: '',
      message: ''
    },
    fieldErrors: {},
    ok: true
  }
}
