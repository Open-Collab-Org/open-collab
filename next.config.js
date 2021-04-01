// https://nextjs.org/docs/api-reference/next.config.js/introduction

module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    env: {
        ...defaultConfig.env,
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
            '6Leei5IaAAAAADetmz9vK1_F1HSw3moZuncheSNv',
        NEXT_PUBLIC_API_BASE_URL: 'http://172.29.81.250:3001' // Base URL to API calls
    },
    redirects: () => [
        {
            source: '/projects',
            destination: '/',
            permanent: true
        }
    ]
});
