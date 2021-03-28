import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Header from '@components/Header';
import { Input, InputLabel, InputWrap } from '@components/styles/inputs';
import { LoginSheet } from '@components/styles/sheets';
import { Button } from '@components/styles/buttons';
import { IntegrationButton } from '@components/styles/integrations';
import { ButtonHint, Title } from '@components/styles/titles';

const LoginWith = styled(ButtonHint)`
    margin: 15px 0 25px 0;
`;

const ForgotPassword = styled.a`
    font-size: 14px;
    line-height: 16px;
    color: #c6c6c6;
    text-align: right;
    margin: 8px 0 25px 0;
    cursor: pointer;
`;

const Spacer = styled.div`
    margin: 0 20px;
`;

const Login = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted!');
    };

    return (
        <>
            <Header />

            <LoginSheet onSubmit={handleSubmit} noValidate={true}>
                <Title>Login</Title>

                <InputWrap>
                    <InputLabel htmlFor="login">Username or email</InputLabel>
                    <Input
                        name="login"
                        id="login"
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

                    <Button>Login</Button>
                    <ButtonHint className="mt-2">
                        Don't have an account yet?{' '}
                        <Link href="/signup">
                            <a>Signup</a>
                        </Link>
                    </ButtonHint>
                    <LoginWith>or login with</LoginWith>
                    <div className="d-flex justify-content-center">
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
                </InputWrap>
            </LoginSheet>
        </>
    );
};

export default Login;
