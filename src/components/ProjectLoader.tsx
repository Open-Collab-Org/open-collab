import React, { PropsWithChildren, Ref } from 'react';
import styled, {
    DefaultTheme,
    keyframes,
    StyledComponent
} from 'styled-components';
import { Separator } from './styles/util';

const loadFrames = keyframes`
          from {
            left: -100%;
          }
          to   {
            left: 100%;
          }
        `;

const Skeleton = styled.div`
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

const SkeletonTitle = styled(Skeleton)`
    width: 200px;
    height: 30px;
    border-radius: 3px;
`;

const SkeletonTags = styled.div`
    margin: 20px 0 24px 0;
`;

const SkeletonTag = styled(Skeleton)`
    display: inline-block;
    width: 60px;
    height: 25px;
    margin-right: 10px;
    border-radius: 5px;
`;

const SkeletonDescription = styled.div`
    margin-bottom: 1rem;
`;

const SkeletonLine = styled<
    StyledComponent<'div', DefaultTheme, { width: number }>
>(Skeleton)`
    width: ${props => `${props.width}%`};
    height: 15px;
    border-radius: 1px;
    margin-bottom: 10px;
`;

/**
 * Skeleton loader for the Project component
 */
const ProjectLoader = (
    _props: PropsWithChildren<any>,
    ref: Ref<HTMLDivElement>
) => (
    <div ref={ref}>
        <Separator />
        <SkeletonTitle />
        <SkeletonTags>
            <SkeletonTag />
            <SkeletonTag />
            <SkeletonTag />
        </SkeletonTags>
        <SkeletonDescription>
            <SkeletonLine width={100} />
            <SkeletonLine width={100} />
            <SkeletonLine width={100} />
        </SkeletonDescription>
        <SkeletonLine width={45} />
    </div>
);
export default React.forwardRef<HTMLDivElement>(ProjectLoader);
