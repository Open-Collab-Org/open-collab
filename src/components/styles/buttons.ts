import styled from 'styled-components';

export const Button = styled.button`
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

export const ActionButton = styled(Button)`
    margin: 0;
    min-width: 86px;
    :hover {
        color: white;
    }
`;

export const PublishButton = styled(ActionButton)`
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    :hover {
        background-color: ${props => props.theme.colors.primary};
    }
`;

export const ArchiveButton = styled(ActionButton)`
    color: ${props => props.theme.colors.danger};
    border-color: ${props => props.theme.colors.danger};
    :hover {
        background-color: ${props => props.theme.colors.danger};
    }
`;
