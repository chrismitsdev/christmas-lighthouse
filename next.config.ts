import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  transpilePackages: ['@chrismitsdev/menu-data']
}
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
