import styled, { css } from 'styled-components';

const inputCss = css`
    background-color: ${props => props.theme.colors.grayScale.seven};
    border: 1px solid #cfcfcf;
    padding: 5px;
    font-size: 16px;
    width: 100%;
    min-height: 35px;
    margin-bottom: 25px;
    line-height: 19px;
    font-family: ${props => props.theme.fonts.roboto};
    ::placeholder {
        color: #d7d7d7;
    }
`;

export const Input = styled.input`
    ${inputCss};
`;

export const TextArea = styled.textarea`
    ${inputCss};
    padding: 12px 15px;
`;

export const InputLabel = styled.label`
    color: #7e7e7e;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: ${props => props.theme.fonts.roboto};
`;

export const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
`;
