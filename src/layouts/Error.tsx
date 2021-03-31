import React from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import styled from 'styled-components';

const Container = styled.div`
    font-family: ${props => props.theme.fonts.roboto};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10%;
    text-align: center;
`;

const ErrorCode = styled.h1`
    font-size: 60px;
    line-height: 70px;
`;

const Message = styled.p`
    color: ${props => props.theme.colors.grayScale.one};
    font-size: 24px;
    margin: 3% 0;
    padding: 0 20%;
    max-width: 317px;
    box-sizing: content-box;
`;

const Anchor = styled.a`
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    font-size: 18px;
`;

const Error = ({ code }: { code?: number }) => {
    const errorMessages = {
        404: "It seems like the page you are looking for doesn't exist",
        // Default message
        undefined: 'An unexpected error has occurred. Please try again'
    };

    return (
        <>
            <Header pathname="/error" />

            <Container>
                <ErrorCode>{code ? code : 'Error'}</ErrorCode>

                {/* @ts-ignore In this case we want to use undefined as an index type to the default message */}
                <Message>{errorMessages[code]}</Message>

                <Link href="/" replace={true}>
                    <Anchor>home</Anchor>
                </Link>
            </Container>
        </>
    );
};

export default Error;
