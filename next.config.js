// https://nextjs.org/docs/api-reference/next.config.js/introduction

module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    env: {
        RECAPTCHA_SITE_KEY: ''
    }
});
