import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@components/Header';
import { Input, InputLabel, InputWrap } from '@components/styles/inputs';
import { LoginSheet } from '@components/styles/sheets';
import { Button } from '@components/styles/buttons';
import { AuthTitle } from '@components/styles/titles';
import Recaptcha from '@components/Recaptcha';

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
                <AuthTitle>Change Password</AuthTitle>

                <InputWrap>
                    <InputLabel htmlFor="password">New password</InputLabel>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="********"
                    />
                    <InputLabel htmlFor="confirmPassword">
                        Confirm new password
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

                    <Button>Save</Button>
                </InputWrap>
            </LoginSheet>
        </>
    );
};

export default Recover;
