'use client'

import {
  MailIcon,
  MessageSquareMoreIcon,
  MessagesSquareIcon,
  SendHorizonalIcon,
  SmartphoneIcon,
  UserIcon
} from 'lucide-react'
import {useLocale, useTranslations} from 'next-intl'
import {useActionState, useEffect} from 'react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Button} from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/src/components/ui/card'
import {Input} from '@/src/components/ui/input'
import {Textarea} from '@/src/components/ui/textarea'
import {toast} from '@/src/components/ui/toast'
import {type ContactFormActionState, sendContactForm} from '@/src/lib/actions'

const initialState: ContactFormActionState = {
  data: {
    fullname: '',
    email: '',
    phone: '',
    message: ''
  },
  fieldErrors: {},
  ok: null
}

function Contact({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.contact')
  const [state, formAction, isPending] = useActionState(
    sendContactForm.bind(null, useLocale()),
    initialState
  )

  useEffect(() => {
    if (state.ok === null) return

    if (state.ok) {
      toast({
        title: t('form.toast.success.title'),
        description: t('form.toast.success.description'),
        status: 'success'
      })
    }

    if (!state.ok) {
      toast({
        title: t(`form.toast.error.${state.reason}.title`),
        description: t(`form.toast.error.${state.reason}.description`),
        status: 'error'
      })
    }
  }, [state, t])

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <form
          action={formAction}
          noValidate
        >
          <Card className=' sm:[--card-padding:--spacing(20)]'>
            <CardHeader className='flex justify-center'>
              <div className='p-6 rounded-full bg-brand-gray-12 sm:p-10'>
                <MessagesSquareIcon className='size-20 text-brand-gray-11 sm:size-24' />
              </div>
            </CardHeader>
            <CardContent className='space-y-4 not-sm:pt-10'>
              <Input
                defaultValue={state.data.fullname}
                placeholder={t('form.field.fullname')}
                type='text'
                name='fullname'
                icon={<UserIcon />}
                autoComplete='name'
                error={state.fieldErrors.fullname}
                disabled={isPending}
              />
              <Input
                defaultValue={state.data.email}
                placeholder={t('form.field.email')}
                type='email'
                name='email'
                icon={<MailIcon />}
                autoComplete='email'
                error={state.fieldErrors.email}
                disabled={isPending}
              />
              <Input
                defaultValue={state.data.phone}
                placeholder={t('form.field.phone')}
                type='tel'
                name='phone'
                icon={<SmartphoneIcon />}
                autoComplete='tel'
                error={state.fieldErrors.phone}
                disabled={isPending}
              />
              <Textarea
                defaultValue={state.data.message}
                placeholder={t('form.field.message')}
                name='message'
                icon={<MessageSquareMoreIcon />}
                error={state.fieldErrors.message}
                disabled={isPending}
              />
            </CardContent>
            <CardFooter className='justify-end'>
              <Button
                size='lg'
                type='submit'
                disabled={isPending}
                isLoading={isPending}
              >
                <span>{t('form.submit-button')}</span>
                <SendHorizonalIcon className='size-5' />
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Container>
    </Section>
  )
}

Contact.displayName = 'Contact'

export {Contact}
