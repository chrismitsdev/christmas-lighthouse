import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

interface InternalEmailProps {
  fullname: string
  email: string
  phone: string
  message?: string
}

const baseUrl = 'https://i.imgur.com'

function InternalEmail({fullname, email, phone, message}: InternalEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          webFont={{
            url: 'https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2',
            format: 'woff2'
          }}
          fontFamily='Manrope'
          fallbackFontFamily='Verdana'
          fontStyle='normal'
          fontWeight={400}
        />
      </Head>
      <Tailwind config={{presets: [pixelBasedPreset]}}>
        <Body className='m-0 bg-[#050714] text-[#c4c9d9]'>
          <Preview>Φόρμα επικοινωνίας - Τhe Christmas Lighthouse</Preview>
          <Container className='my-6'>
            <Section className='p-6 bg-[#10111e]'>
              <Row className='mb-8'>
                <Column align='center'>
                  <Img
                    src={`${baseUrl}/ZWi19Gy.png`}
                    height='96px'
                    alt='The Christmas Lighthouse logo'
                  />
                </Column>
              </Row>
              <Row>
                <Column className='pr-2'>
                  <Img
                    src={`${baseUrl}/N2iaopr.png`}
                    width='24px'
                    height='24px'
                    alt='Alert icon'
                  />
                </Column>
                <Column className='w-full'>
                  <Heading
                    as='h3'
                    className='my-0'
                  >
                    Νέα υποβολή φόρμας
                  </Heading>
                </Column>
              </Row>
            </Section>

            <Hr className='my-4 border-transparent' />

            <Section className='p-6 bg-[#10111e]'>
              <Row className='mb-2'>
                <Column className='pr-1'>
                  <Img
                    src={`${baseUrl}/ldPSYWd.png`}
                    width='16px'
                    height='16px'
                    alt='User icon'
                  />
                </Column>
                <Column className='w-full'>
                  <Text className='my-0 font-bold text-sm leading-6'>
                    Όνομα:
                  </Text>
                </Column>
              </Row>
              <Row>
                <Text className='my-0 text-sm'>{fullname}</Text>
              </Row>

              <Hr className='my-6 border-[#1d1f2b]' />

              <Row className='mb-2'>
                <Column className='pr-1'>
                  <Img
                    src={`${baseUrl}/qggszrK.png`}
                    width='16px'
                    height='16px'
                    alt='User icon'
                  />
                </Column>
                <Column className='w-full'>
                  <Text className='my-0 font-bold text-sm leading-6'>
                    Email:
                  </Text>
                </Column>
              </Row>
              <Row>
                <Link
                  className='block text-sm leading-5'
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
              </Row>

              <Hr className='my-6 border-[#1d1f2b]' />

              <Row className='mb-2'>
                <Column className='pr-1'>
                  <Img
                    src={`${baseUrl}/7I41spr.png`}
                    width='16px'
                    height='16px'
                    alt='User icon'
                  />
                </Column>
                <Column className='w-full'>
                  <Text className='my-0 font-bold text-sm leading-6'>
                    Αριθμός τηλεφώνου:
                  </Text>
                </Column>
              </Row>
              <Row>
                <Link
                  className='block text-sm leading-5'
                  href={`tel:${phone}`}
                >
                  {phone}
                </Link>
              </Row>

              <Hr className='my-6 border-[#1d1f2b]' />

              <Row className='mb-2'>
                <Column className='pr-1'>
                  <Img
                    src={`${baseUrl}/9yMrRNi.png`}
                    width='16px'
                    height='16px'
                    alt='User icon'
                  />
                </Column>
                <Column className='w-full'>
                  <Text className='my-0 font-bold text-sm leading-6'>
                    Μήνυμα:
                  </Text>
                </Column>
              </Row>
              <Row>
                <Text className='my-0 leading-5'>
                  {message || 'Ο χρήστης δεν άφησε κάποιο μήνυμα.'}
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

InternalEmail.displayName = 'InternalEmail'

export {InternalEmail}
