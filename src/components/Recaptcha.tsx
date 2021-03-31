import React from 'react';

/**
 * UUID generator. Note that since this uses `Math.random()` the UUID may not
 * be unique. **Don't** use this when uniqueness is really important. Here this will
 * be more than enough - it's already an overkill to be honest.
 */
const uuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

// Queue of [load methods of] recaptchas to render
type OnScriptLoadFn = () => void;
const queue: OnScriptLoadFn[] = [];

const injectScript = (nonce?: string) => {
    const callbackName = 'GoogleRecaptchaLoaded';

    // Callback when the script loads
    (window as any)[callbackName] = () => {
        while (queue.length) {
            const toLoad = queue.shift();
            toLoad && toLoad();
        }
    };

    // Create the script tag on the page
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.id = 'RecaptchaScript';
    script.onerror = function (error) {
        throw error;
    };
    script.src = `https://www.google.com/recaptcha/api.js?hl=${navigator.language}&onload=${callbackName}&render=explicit`;
    script.type = 'text/javascript';
    nonce && script.setAttribute('nonce', nonce);
    document.body.appendChild(script);
};

interface RecaptchaProps {
    /**
     * Callback to execute when the challenge is completed
     *
     * Two params are passed to this function, where the first is the recaptcha
     * response token - it's not necessary to call `getResponse()` - and the second
     * the ref of the recaptcha itself, easing the usage of `reset()`
     *
     * @example
     * const handleResolved = (token, captcha) => {
     *     // Don't use captcha.execute() here
     *     //...
     * }
     *
     * // In the <Recaptcha> tag
     * onResolved={handleResolved}
     */
    onResolved: (token: string, captcha: Recaptcha) => void;

    /**
     * callback executed when an error occurs in Google's end. Usually the problem
     * is slowness in the user's internet connection. If specified, you are responsible for
     * informing the user he or she should try again
     */
    onError?: () => void;

    /**
     * Callback executed when the user's response expires and they need to complete the challenge again
     */
    onExpired?: () => void;

    /**
     * Callback executed when the reCaptcha badge was successfully invoked and is ready to use
     */
    onLoaded?: () => void;

    /**
     * The badge's theme. Default dark
     */
    theme?: 'light' | 'dark';

    /**
     * The badge's position. Default bottomright
     */
    badge?: 'bottomright' | 'bottomleft' | 'inline';

    /**
     * The badge's tab index. Default to -1
     */
    recaptchaTabIndex?: number;
}

/**
 * @see https://developers.google.com/recaptcha/docs/invisible#render_param
 */
interface RenderParams {
    /**
     * Your site key.
     */
    sitekey: string;

    /**
     * Optional. Reposition the reCAPTCHA badge. 'inline' lets you position it with CSS.
     */
    badge?: 'bottomright' | 'bottomleft' | 'inline';

    /**
     * Optional. Theme of the badge.
     */
    theme?: 'light' | 'dark';

    /**
     * Optional. Used to create an invisible widget bound to a div and programmatically executed.
     */
    size?: 'invisible';

    /**
     * Optional. The tabindex of the challenge. If other elements in your page use tabindex, it should be set to make user navigation easier.
     */
    tabindex?: number;

    /**
     * Optional. The name of your callback function, executed when the user submits a successful response.
     * The g-recaptcha-response token is passed to your callback.
     */
    callback?: string;

    /**
     * Optional. The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.
     */
    'expired-callback'?: string;

    /**
     *    Optional. The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity)
     *    and cannot continue until connectivity is restored. If you specify a function here,
     *    you are responsible for informing the user that they should retry.
     */
    'error-callback'?: string;

    /**
     * Optional. For plugin owners to not interfere with existing reCAPTCHA installations on a page.
     * If true, this reCAPTCHA instance will be part of a separate ID space.
     */
    isolated?: boolean;
}

/**
 * @see https://developers.google.com/recaptcha/docs/verify#error_code_reference
 */
type ErrorCodes =
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'timeout-or-duplicate';

/**
 * @see https://developers.google.com/recaptcha/docs/verify#api-response
 */
interface RecaptchaResponse {
    success: boolean;
    challenge_ts: number;
    hostname: string;
    'error-codes'?: ErrorCodes[];
}

interface GoogleRecaptchaJSApi {
    /**
     * Renders the container as a reCAPTCHA widget and returns the ID of the newly created widget.
     *
     * @param container The HTML element to render the reCAPTCHA widget. Specify either the ID of the container (string) or the DOM element itself.
     * @param parameters An object containing parameters as key=value pairs, for example, {sitekey: "your_site_key", theme: "light"}.
     * @return The created widget's ID
     */
    render: (container: HTMLElement, parameters: RenderParams) => string;

    /**
     * Programmatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
     *
     * @param id Optional widget ID, defaults to the first widget created if unspecified.
     */
    execute: (id?: string) => void;

    /**
     * Resets the reCAPTCHA widget.
     *
     * @param id Optional widget ID, defaults to the first widget created if unspecified.
     */
    reset: (id?: string) => void;

    /**
     * Gets the response for the reCAPTCHA widget.
     *
     * @param id Optional widget ID, defaults to the first widget created if unspecified.
     */
    getResponse: (id?: string) => RecaptchaResponse;
}

declare global {
    interface Window {
        grecaptcha?: GoogleRecaptchaJSApi;
    }
}

export default class Recaptcha extends React.Component<RecaptchaProps> {
    static defaultProps = {
        recaptchaTabIndex: -1
    };

    private onResolvedName!: string;

    private onErrorName!: string;

    private onExpiredName!: string;

    private container: HTMLDivElement | undefined | null;

    public execute!: () => void;

    public reset!: () => void;

    public getResponse!: () => RecaptchaResponse | null;

    componentDidMount() {
        const {
            onResolved,
            onError,
            onExpired,
            onLoaded,
            theme,
            badge,
            recaptchaTabIndex
        } = this.props;

        // Callbacks are defined here and called by Google's script

        this.onResolvedName = `RecaptchaResolved-${uuid()}`;
        (window as any)[this.onResolvedName] = (token: string) => {
            onResolved(token, this);
        };

        this.onErrorName = `RecaptchaError-${uuid()}`;
        (window as any)[this.onErrorName] = onError;

        this.onExpiredName = `RecaptchaExpired-${uuid()}`;
        (window as any)[this.onExpiredName] = onExpired;

        // Called by Google
        const onScriptLoad: OnScriptLoadFn = () => {
            if (!this.container || !window.grecaptcha) return;

            // Wrapper around recaptcha since Google only allows rendering it in an empty tag
            const wrapper = document.createElement('div');
            this.container.appendChild(wrapper);

            // Render the challenge
            const widgetId = window.grecaptcha.render(wrapper, {
                sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
                theme,
                badge,
                size: 'invisible',
                tabindex: recaptchaTabIndex,
                callback: this.onResolvedName,
                'expired-callback': this.onExpiredName,
                'error-callback': this.onErrorName,
                isolated: false
            });

            // Bind the functions to execute the challenge
            this.execute = () =>
                window.grecaptcha && window.grecaptcha.execute(widgetId);
            this.reset = () =>
                window.grecaptcha && window.grecaptcha.reset(widgetId);
            this.getResponse = () =>
                window.grecaptcha
                    ? window.grecaptcha.getResponse(widgetId)
                    : null;

            // Execute the onLoaded callback if defined
            onLoaded && onLoaded();
        };

        if (
            window.grecaptcha &&
            window.grecaptcha.render &&
            window.grecaptcha.execute &&
            window.grecaptcha.reset &&
            window.grecaptcha.getResponse
        ) {
            // The script is already loaded, now load the captcha itself
            onScriptLoad();
        } else {
            /*
             * The script is still loading, add the captcha loader to the queue to be ran when
             * the google script loads
             */
            queue.push(onScriptLoad);

            // If the page doesn't have a script already, add it
            if (!document.querySelector('#RecaptchaScript')) {
                injectScript();
            }
        }
    }

    componentWillUnmount() {
        /*
         * TODO Sometimes Errors are visible in the console because Google keeps running its
         *  internal logic even after the widget was removed, but this DOESN'T affect the app in any way
         * https://github.com/dozoisch/react-google-recaptcha/pull/120 - não funciona, ver abaixo
         * https://github.com/dozoisch/react-google-recaptcha/issues/171
         * https://github.com/dozoisch/react-google-recaptcha/issues/103
         */
        while (this.container && this.container.firstChild) {
            this.container.firstChild.remove();
        }

        // Ensure the script loaded before attempting to call reset
        if (this.reset) this.reset();

        // Remove the callbacks from the window
        delete (window as any)[this.onResolvedName];
        delete (window as any)[this.onErrorName];
        delete (window as any)[this.onExpiredName];
    }

    render() {
        return (
            <div
                ref={ref => {
                    this.container = ref;
                }}
            />
        );
    }
}
