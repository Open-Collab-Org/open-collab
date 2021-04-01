import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledHomeHeader = styled.div`
    background-color: ${props => props.theme.colors.darkGraffiti};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
`;

const Title = styled.h1`
    font-family: ${props => props.theme.fonts.robotoMono};
    font-weight: 700;
    font-size: 42px;
    color: white;
    line-height: 56px;
`;

const Slogan = styled.span`
    font-family: ${props => props.theme.fonts.raleway};
    font-weight: 300;
    font-size: 24px;
    color: #ffffff80;
    line-height: 28px;
    margin-top: 35px;
    margin-bottom: 65px;
`;

const SemiBoldSlogan = styled(Slogan)`
    font-weight: 600;
    color: #ffffff99;
`;

const Nav = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 50%;
`;

const NavLink = styled.a`
    cursor: pointer;
    font-family: ${props => props.theme.fonts.roboto};
    font-size: 20px;
    color: #ffffff80;
    line-height: 36px;
    :hover {
        color: white;
        text-decoration: none;
    }
`;

const Button = styled.a`
    font-family: ${props => props.theme.fonts.roboto};
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: white;
    border-radius: 4px;
    border: 1px solid white;
    background-color: transparent;
    padding: 10px 20px;
    :hover {
        color: ${props => props.theme.colors.darkGraffiti};
        background-color: white;
        text-decoration: none;
        cursor: pointer;
    }
`;

const ButtonsWrap = styled.div`
    display: inline-flex;
    justify-content: flex-end;
`;

const HomeHeader = () => (
    <StyledHomeHeader>
        <div className="row w-100 align-items-center">
            <div className="col" />
            <div className="col">
                {' '}
                <Title>Open Collab</Title>
            </div>
            <ButtonsWrap className="col">
                <Link href="/login" passHref={true}>
                    <Button>Login</Button>
                </Link>
                <Link href="/signup" passHref={true}>
                    <Button style={{ marginLeft: 20 }}>Signup</Button>
                </Link>
            </ButtonsWrap>
        </div>
        <Slogan>
            Where <SemiBoldSlogan>open source</SemiBoldSlogan> ideas come to
            life
        </Slogan>
        <Nav>
            <Link href="/faq#about" passHref={true}>
                <NavLink>What is this site?</NavLink>
            </Link>
            <Link href="/faq#target" passHref={true}>
                <NavLink>Who is this for?</NavLink>
            </Link>
            <Link href="/faq#pricing" passHref={true}>
                <NavLink>Is this free?</NavLink>
            </Link>
        </Nav>
    </StyledHomeHeader>
);

export default HomeHeader;
