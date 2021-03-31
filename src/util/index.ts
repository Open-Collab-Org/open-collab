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
 * @return the same promise as Next's router `push` method
 */
export const addQueryParam = (
    router: NextRouter,
    paramName: string,
    value: string,
    append = true
) => {
    const config = {
        pathname: router.pathname,
        query: { ...router.query }
    };

    if (doesQueryParamExist(router, paramName)) {
        if (!isValueInQueryParam(router, paramName, value)) {
            config.query[paramName] = append
                ? `${router.query[paramName]}${encodeURIComponent(`,${value}`)}`
                : encodeURIComponent(value);
        }
    } else {
        config.query[paramName] = encodeURIComponent(value);
    }

    return router.push(config);
};

/**
 * Removes a value from the specified query param if it's present on the query. If the value
 * is the only one in the provided query, it will remove the query completely
 *
 * @param router
 * @param paramName
 * @param value
 * @return the same promise as Next's router `push` method
 */
export const removeQueryParam = (
    router: NextRouter,
    paramName: string,
    value: string
) => {
    const config = {
        pathname: router.pathname,
        query: { ...router.query }
    };

    if (isValueInQueryParam(router, paramName, value)) {
        config.query[paramName] = decodeURIComponent(
            config.query[paramName] as string
        );
        config.query[paramName] = (config.query[paramName] as string)
            .split(',')
            .filter(v => v !== value)
            .join(',');
        if ((config.query[paramName] as string).length > 0) {
            config.query[paramName] = encodeURIComponent(
                config.query[paramName] as string
            );
        } else {
            delete config.query[paramName];
        }
    }

    return router.push(config);
};

/**
 * Returns if the `value` is already present in the query param `paramName`
 * @param router Next router to retrieve the current query
 * @param paramName the name of the query param to check if the value is present
 * @param value decoded value to check against the query
 */
export const isValueInQueryParam = (
    router: NextRouter,
    paramName: string,
    value: string
) =>
    doesQueryParamExist(router, paramName) &&
    decodeURIComponent(router.query[paramName] as string)
        .split(',')
        .includes(value);

/**
 * Returns if the query has the param `paramName`, regardless of its values
 * @param router
 * @param paramName
 */
export const doesQueryParamExist = (router: NextRouter, paramName: string) =>
    Object.keys(router.query).includes(paramName);
