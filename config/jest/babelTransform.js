/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const babelJest = require('babel-jest');

// TODO Will this work without dotenv installed?
const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false;
    }

    try {
        require.resolve('react/jsx-runtime');
        return true;
    } catch (e) {
        return false;
    }
})();

module.exports = babelJest.createTransformer({
    presets: [
        [
            require.resolve('babel-preset-react-app'),
            {
                runtime: hasJsxRuntime ? 'automatic' : 'classic'
            }
        ]
    ],
    babelrc: false, // TODO Does this need to be set to true to use the next preset while testing?
    configFile: false
});
