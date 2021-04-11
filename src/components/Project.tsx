import React, { useEffect } from 'react';
import useSWR from 'swr';
import Header from '@components/Header';
import { IProject } from '@types';
import { useRouter } from 'next/router';
import { Grid, LeftCol, MainCol } from '@styles/grid';
import SideBar, { ISideBarItem } from '@components/SideBar';
import styled from 'styled-components';
import { ProjectTitle } from '@styles/titles';
import PreviewEditor from '@components/PreviewEditor';

const ProjectPreview = styled.div`
    min-width: 958px;
    border: 2px solid ${props => props.theme.colors.sheetBorder};
    font-family: ${props => props.theme.fonts.roboto};
    background-color: white;
    padding: 69px 113px;
`;

const Tags = styled.span`
    color: #787878;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    display: inline-block;
    margin-top: 3px;
`;

const Project = ({ id }: { id: number }) => {
    // TODO Skeleton loader
    const { data } = useSWR<IProject>(`/projects/${id}`);
    const router = useRouter();

    useEffect(() => {
        const urlName = data?.name
            .replace(/\s/, '-')
            .replace(/[^a-zA-Z0-9-]/gm, '');

        router.push('', `/projects/${id}/${urlName}`, {
            shallow: true
        });
    }, [data]);

    const sidebarItems: ISideBarItem[] = [
        { text: 'Preview', active: true },
        { text: 'Edit' },
        { text: 'Application' },
        { text: 'Settings' }
    ];

    return (
        <>
            <Header pathname={`/projects/${data?.name}`} />
            <Grid>
                <LeftCol>
                    <SideBar items={sidebarItems} />
                </LeftCol>
                <MainCol>
                    <ProjectPreview>
                        <ProjectTitle>{data?.name}</ProjectTitle>
                        <Tags>{data?.tags.join(', ')}</Tags>
                        <PreviewEditor value={data?.fullDescription || ''} />
                    </ProjectPreview>
                </MainCol>
            </Grid>
        </>
    );
};

export default Project;
