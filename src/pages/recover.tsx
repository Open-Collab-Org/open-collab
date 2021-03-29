import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Header from '@components/Header';
import { Input, InputLabel, InputWrap } from '@components/styles/inputs';
import { LoginSheet } from '@components/styles/sheets';
import { Button } from '@components/styles/buttons';
import { Hint, Title } from '@components/styles/titles';
import Recaptcha from '@components/Recaptcha';

const Info = styled.span`
    text-align: center;
    font-size: 16px;
    color: ${props => props.theme.colors.grayOne};
    margin: 0 15px 40px 15px;
`;

const Recover = () => {
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
        console.log(token);
        isMounted && recaptcha.reset();
    };

    return (
        <>
            <Header />

            <LoginSheet onSubmit={handleSubmit} noValidate={true}>
                <Title>Recover</Title>

                <Info>
                    We will send you an email with instructions on how to
                    recover your account
                </Info>

                <InputWrap>
                    <InputLabel htmlFor="login">Username or email</InputLabel>
                    <Input
                        name="username"
                        id="username"
                        type="text"
                        placeholder="JohnDoe"
                    />

                    <Recaptcha
                        onResolved={handleRecaptchaResolved}
                        ref={ref => setReCaptcha(ref!)}
                    />

                    <Button>Recover</Button>

                    <Hint className="mt-4" style={{ marginTop: 15 }}>
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

export default Recover;
