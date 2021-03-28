import styled from 'styled-components';

export const Input = styled.input`
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

export const InputLabel = styled.label`
    color: #7e7e7e;
    font-size: 14px;
    line-height: 16px;
`;

export const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
`;
