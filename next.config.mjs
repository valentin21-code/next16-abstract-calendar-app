import createNextIntlPlugin from 'next-intl/plugin';

// next-intl requires a request config file. This plugin wires it into Next.
// Do not import server-only code from client components.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  sassOptions: {
    includePaths: ['src']
  }
});
