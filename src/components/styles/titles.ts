import styled from 'styled-components';

export const Title = styled.h1`
    font-family: ${props => props.theme.fonts.raleway};
    color: ${props => props.theme.colors.darkGraffiti};
    font-size: 36px;
    margin: 30px 0 50px 0;
`;

export const Hint = styled.span`
    color: #7e7e7e;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
`;
