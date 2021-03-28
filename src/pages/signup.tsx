import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';

const SignupSheet = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: ${props => props.theme.fonts.roboto};
    background-color: ${props => props.theme.colors.sheet};
    border: 2px solid ${props => props.theme.colors.sheetBorder};
    max-width: 409px;
    margin: 5% auto;
    padding: 30px;
`;

const Title = styled.h1`
    font-family: ${props => props.theme.fonts.raleway};
    color: ${props => props.theme.colors.darkGraffiti};
    font-size: 36px;
    margin: 30px 0 50px 0;
`;

const Input = styled.input`
    background-color: ${props => props.theme.colors.fieldBg};
    border: 1px solid ${props => props.theme.colors.fieldBorder};
    padding: 5px;
    font-size: 16px;
    width: 100%;
    min-height: 35px;
    margin-bottom: 25px;
    line-height: 19px;
    ::placeholder {
        color: #d7d7d7;
    }
`;

const InputLabel = styled.label`
    color: #7e7e7e;
    font-size: 14px;
    line-height: 16px;
`;

const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
`;

const RegisterBtn = styled.button`
    width: 100%;
    color: ${props => props.theme.colors.darkGraffiti};
    border: 1px solid ${props => props.theme.colors.darkGraffiti};
    margin-top: 30px;
    background-color: white;
    font-size: 16px;
    border-radius: 4px;
    padding: 5px;
    :hover {
        background-color: ${props => props.theme.colors.darkGraffiti};
        color: white;
    }
`;

const RegisterWithLabel = styled.span`
    color: #7e7e7e;
    font-size: 14px;
    text-align: center;
    margin: 25px 0 25px 0;
`;

const ExternalRegisterWrap = styled.div`
    display: flex;
    justify-content: center;
`;

const ExternalRegisterBtn = styled.a`
    display: inline-block;
    padding: 12px;
    box-shadow: 0 2px 5px #00000030;
    border-radius: 4px;

    :hover {
        transform: scale(1.1);
    }
`;

const Spacer = styled.div`
    margin: 0 20px;
`;

const Signup = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted!');
    };

    return (
        <>
            <Header />

            <SignupSheet onSubmit={handleSubmit} noValidate={true}>
                <Title>Signup</Title>

                <InputWrap>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        name="username"
                        id="username"
                        type="text"
                        placeholder="JohnDoe"
                    />
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <Input
                        name="email"
                        id="email"
                        type="text"
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

                    <RegisterBtn>Signup</RegisterBtn>
                    <RegisterWithLabel>or signup with</RegisterWithLabel>
                    <ExternalRegisterWrap>
                        <ExternalRegisterBtn href="#">
                            <img
                                width={32}
                                src="/icons/google.png"
                                alt="Register with GitHub"
                            />
                        </ExternalRegisterBtn>
                        <Spacer />
                        <ExternalRegisterBtn href="#">
                            <img
                                width={32}
                                src="/icons/github.png"
                                alt="Register with Google"
                            />
                        </ExternalRegisterBtn>
                    </ExternalRegisterWrap>
                </InputWrap>
            </SignupSheet>
        </>
    );
};

export default Signup;
