import styled, {
    DefaultTheme,
    keyframes,
    StyledComponent
} from 'styled-components';

const loadFrames = keyframes`
          from {
            left: -100%;
          }
          to   {
            left: 100%;
          }
        `;

export const Skeleton = styled.div`
    background-color: ${props => props.theme.colors.grayScale.five};
    position: relative;
    overflow: hidden;
    padding: 5px;

    :before {
        content: '';
        display: block;
        position: absolute;
        left: -100%;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
        );
        animation: ${loadFrames} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
`;

export const SkeletonLine = styled<
    StyledComponent<'div', DefaultTheme, { widthPercentage: number }>
>(Skeleton)`
    width: ${props => `${props.widthPercentage}%`};
    height: 15px;
    border-radius: 1px;
    margin-bottom: 10px;
`;
