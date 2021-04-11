import styled from 'styled-components';

export const Grid = styled.div`
    display: flex;
    justify-content: center;
    margin: 55px auto;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto;
`;

export const MainCol = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
`;

export const LeftCol = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 36px;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
`;
