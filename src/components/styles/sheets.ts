import styled from 'styled-components';

export const LoginSheet = styled.form`
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

export const SignupSheet = styled.form`
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
