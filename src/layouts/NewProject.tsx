import Header from '@components/Header';
import { Input, InputLabel, InputWrap, TextArea } from '@styles/inputs';
import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar, { ISideBarItem } from '@components/SideBar';
import Editor from '@components/Editor';

const NewProjectSheet = styled.form`
    display: grid;
    flex-wrap: wrap;
    min-width: 958px;
    width: 100%;
    padding: 45px 104px;
    background-color: white;
    border: 2px solid ${props => props.theme.colors.sheetBorder};
`;

const Grid = styled.div`
    display: flex;
    justify-content: center;
    margin: 55px auto;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto;
`;

const MainCol = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
`;

const LeftCol = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 36px;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
`;

const ProjectName = styled(Input)`
    max-width: 418px;
`;

const Tags = styled(Input)`
    max-width: 418px;
`;

const ShortDescription = styled(TextArea)`
    min-height: 102px;
    max-width: 418px;
    resize: none;
`;

interface NewProjectProps {
    /**
     * Array that represents the selected action from the URL
     *
     * @example
     * // /projects/new/edit/something-else => ['edit', 'something-else']
     * // /projects/new/edit => ['edit']
     * // /projects/new => []
     */
    action: string[];
}

const NewProject = ({ action }: NewProjectProps) => {
    const [projectName, setProjectName] = useState('New Project');

    console.log(action);

    const handleProjectNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/gm, '');
        setProjectName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const sidebarItems: ISideBarItem[] = [
        { text: 'Edit', active: true },
        { text: 'Publish' }
    ];

    return (
        <>
            <Header pathname={`/projects/${projectName || 'New Project'}`} />

            <Grid>
                <LeftCol>
                    <SideBar items={sidebarItems} />
                </LeftCol>

                <MainCol>
                    <NewProjectSheet onSubmit={handleSubmit} noValidate={true}>
                        <InputWrap>
                            <InputLabel htmlFor="projectName">
                                Project name
                            </InputLabel>
                            <ProjectName
                                id="projectName"
                                name="projectName"
                                placeholder="My awesome project"
                                onChange={handleProjectNameChange}
                            />

                            <InputLabel htmlFor="tags">Tags</InputLabel>
                            <Tags
                                id="tags"
                                name="tags"
                                placeholder="NextJS, React, Typescript"
                            />

                            <InputLabel htmlFor="shortDescription">
                                Short description
                            </InputLabel>
                            <ShortDescription
                                id="shortDescription"
                                name="shortDescription"
                                placeholder="Describe your project in a few words"
                            />

                            <InputLabel>Full description</InputLabel>
                            <Editor />
                        </InputWrap>
                    </NewProjectSheet>
                </MainCol>
            </Grid>
        </>
    );
};

export default NewProject;
