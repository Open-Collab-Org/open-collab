import { NextRouter } from 'next/router';

/**
 * Redirects the user using Next's router to the provided pathname,
 * after adding to the query param `paramName` the value `value`. If `append`
 * is set to `false` (defaults to `true`), the value provided will be the only one in the
 * query param. If it's set to `true`, it will append the value to the current one.
 *
 * This method encodes the value to an URI friendly format and does **not** add the value
 * to the query param if it's already present there.
 *
 * @param router NextRouter from `useRouter` hook
 * @param pathname To where the user should be redirected
 * @param paramName Name of the query param to be altered
 * @param value Value to be added to the provided query param
 * @param append Whether or not the value should replace existing ones in the query param
 */
export const addQueryParam = (
    router: NextRouter,
    pathname: string,
    paramName: string,
    value: string,
    append = true
) => {
    const config = {
        pathname,
        query: { ...router.query }
    };

    const queryExists = !!router.query[paramName];
    const valueIsAlreadyPresent =
        queryExists &&
        decodeURI(router.query[paramName] as string)
            .split(',')
            .includes(value);

    if (queryExists) {
        if (!valueIsAlreadyPresent) {
            config.query[paramName] = append
                ? `${router.query[paramName]},${encodeURI(value)}`
                : encodeURI(value);
        }
    } else {
        config.query[paramName] = encodeURI(value);
    }

    return router.push(config);
};
