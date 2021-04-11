import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Header from '@components/Header';
import { Input, InputLabel, InputWrap } from '@components/styles/inputs';
import { SignupSheet } from '@components/styles/sheets';
import { Button } from '@components/styles/buttons';
import { IntegrationButton } from '@components/styles/integrations';
import { AuthHint, AuthTitle } from '@components/styles/titles';
import Recaptcha from '@components/Recaptcha';

const SignupWith = styled(AuthHint)`
    margin: 25px 0 25px 0;
`;

const Spacer = styled.div`
    margin: 0 20px;
`;

const Signup = () => {
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
        isMounted && recaptcha.execute();
    };

    const handleRecaptchaResolved = (token: string, captcha: Recaptcha) => {
        axios({
            url: '/users',
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            method: 'POST',
            cancelToken: source.token,
            data: {
                username: (document.getElementById(
                    'username'
                ) as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement)
                    .value,
                password: (document.getElementById(
                    'password'
                ) as HTMLInputElement).value,
                recaptchaToken: token
            }
        })
            .catch(err => console.error(err))
            .finally(() => isMounted && captcha.reset());
    };

    return (
        <>
            <Header />

            <SignupSheet
                onSubmit={handleSubmit}
                noValidate={true}
                id="signup-form"
            >
                <AuthTitle>Signup</AuthTitle>

                <InputWrap>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        name="username"
                        id="username"
                        placeholder="JohnDoe"
                    />
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <Input
                        name="email"
                        id="email"
                        placeholder="john@email.com"
                    />
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="********"
                    />
                    <InputLabel htmlFor="confirmPassword">
                        Confirm password
                    </InputLabel>
                    <Input
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        placeholder="********"
                    />

                    <Recaptcha
                        onResolved={handleRecaptchaResolved}
                        ref={ref => setReCaptcha(ref!)}
                    />

                    <Button>Signup</Button>
                    <SignupWith>or signup with</SignupWith>
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
                    <AuthHint>
                        Already have an account?{' '}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </AuthHint>
                </InputWrap>
            </SignupSheet>
        </>
    );
};

export default Signup;
