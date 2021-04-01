import React, { PropsWithChildren, Ref } from 'react';
import { Skeleton, SkeletonLine } from '@styles/skeleton';
import { Separator } from '@styles/util';
import styled from 'styled-components';

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

/**
 * Skeleton loader for the Project component
 */
const ProjectSkeleton = (
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
            <SkeletonLine widthPercentage={100} />
            <SkeletonLine widthPercentage={100} />
            <SkeletonLine widthPercentage={100} />
        </SkeletonDescription>
        <SkeletonLine widthPercentage={45} />
    </div>
);

export default React.forwardRef<HTMLDivElement>(ProjectSkeleton);
