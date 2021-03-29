import React from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import styled from 'styled-components';

const Container = styled.div`
    font-family: ${props => props.theme.fonts.roboto};
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10%;
    text-align: center;
`;

const ErrorCode = styled.h1`
    font-size: 80px;
`;

const Message = styled.p`
    font-family: ${props => props.theme.fonts.robotoMono};
    color: ${props => props.theme.colors.grayScale.one};
    margin-top: 5%;
    margin-bottom: 3%;
    padding: 0 20%;
    max-width: 650px;
    box-sizing: content-box;
`;

const HomePage = styled.a`
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
`;

const errorMessages = {
    404: "It seems like the page you are looking for doesn't exist",
    // Default message
    undefined: 'An unexpected error has occurred. Please try again'
};

const Error = ({ code }: { code?: number }) => (
    <>
        <Header pathname="/error" />

        <Container>
            <ErrorCode>{code ? code : 'Error'}</ErrorCode>

            {/* @ts-ignore In this case we want to use undefined as an index type to the default message */}
            <Message>{errorMessages[code]}</Message>

            <Link href="/">
                <HomePage>home</HomePage>
            </Link>
        </Container>
    </>
);

export default Error;
