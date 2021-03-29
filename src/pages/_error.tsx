import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from '@layouts/Error';

const _error: NextPage<{ code?: number }> = ({ code }) => <Error code={code} />;

_error.getInitialProps = ({ res, err }: NextPageContext) => ({
    code: res ? res.statusCode : err ? err.statusCode : 404
});

export default _error;
