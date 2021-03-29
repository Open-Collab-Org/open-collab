import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Header from '@components/Header';
import { Input, InputLabel, InputWrap } from '@components/styles/inputs';
import { LoginSheet } from '@components/styles/sheets';
import { Button } from '@components/styles/buttons';
import { IntegrationButton } from '@components/styles/integrations';
import { Hint, Title } from '@components/styles/titles';
import Recaptcha from '@components/Recaptcha';

const LoginWith = styled(Hint)`
    margin: 15px 0 25px 0;
`;

const ForgotPassword = styled.a`
    font-size: 14px;
    line-height: 16px;
    color: #c6c6c6;
    text-align: right;
    margin: 8px 0 15px 0;
    cursor: pointer;
`;

const Spacer = styled.div`
    margin: 0 20px;
`;

const Login = () => {
    const [isMounted, setMounted] = useState(true);
    const [recaptcha, setReCaptcha] = useState<Recaptcha>(null!);

    const source = axios.CancelToken.source();

    // Cleanup
    useEffect(
        () => () => {
            setMounted(false);
            source.cancel();
        },
        []
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        recaptcha.execute();
    };

    const handleRecaptchaResolved = (token: string, recaptcha: Recaptcha) => {
        axios({
            url: '/login',
            method: 'POST',
            baseURL: process.env.NEXT_PUBLIC_HOST,
            cancelToken: source.token,
            data: {
                username: (document.getElementById(
                    'username'
                ) as HTMLInputElement).value,
                password: (document.getElementById(
                    'password'
                ) as HTMLInputElement).value,
                recaptchaToken: token
            }
        })
            .catch(err => console.error(err))
            .finally(() => isMounted && recaptcha.reset());
    };

    return (
        <>
            <Header />

            <LoginSheet onSubmit={handleSubmit} noValidate={true}>
                <Title>Login</Title>

                <InputWrap>
                    <InputLabel htmlFor="login">Username or email</InputLabel>
                    <Input
                        name="username"
                        id="username"
                        type="text"
                        placeholder="JohnDoe"
                    />
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        className="mb-0"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="********"
                    />
                    <Link href="/recover">
                        <ForgotPassword>Forgot?</ForgotPassword>
                    </Link>

                    <Recaptcha
                        onResolved={handleRecaptchaResolved}
                        ref={ref => setReCaptcha(ref!)}
                    />
                    <Button>Login</Button>
                    <LoginWith>or login with</LoginWith>
                    <div className="d-flex justify-content-center mb-3">
                        <IntegrationButton href="#">
                            <img
                                width={32}
                                src="/icons/google.png"
                                alt="Register with GitHub"
                            />
                        </IntegrationButton>
                        <Spacer />
                        <IntegrationButton href="#">
                            <img
                                width={32}
                                src="/icons/github.png"
                                alt="Register with Google"
                            />
                        </IntegrationButton>
                    </div>
                    <Hint>
                        Don't have an account yet?{' '}
                        <Link href="/signup">
                            <a>Signup</a>
                        </Link>
                    </Hint>
                </InputWrap>
            </LoginSheet>
        </>
    );
};

export default Login;
