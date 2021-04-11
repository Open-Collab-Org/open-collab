import styled from 'styled-components';

export const ProjectTitle = styled.h1`
    font-size: 40px;
    line-height: 47px;
    font-weight: normal;
    font-family: ${props => props.theme.fonts.roboto};
    margin: 0;
`;

export const AuthTitle = styled.h1`
    font-family: ${props => props.theme.fonts.raleway};
    color: ${props => props.theme.colors.darkGraffiti};
    font-size: 36px;
    margin: 30px 0 42px 0;
`;

export const AuthHint = styled.span`
    color: #7e7e7e;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    margin-top: 10px;
`;
