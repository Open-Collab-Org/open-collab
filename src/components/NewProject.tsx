import Header from '@components/Header';
import {
    Input,
    InputLabel,
    InputWrap,
    TextArea
} from '@components/styles/inputs';
import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { EditorSkeleton } from '@styles/skeleton';

const Editor = dynamic(() => import('@components/Editor'), {
    ssr: false,
    loading: EditorSkeleton
});

const NewProjectSheet = styled.form`
    display: flex;
    flex-wrap: wrap;
    max-width: 958px;
    padding: 45px 104px;
    margin: 55px auto;
    background-color: white;
    border: 2px solid ${props => props.theme.colors.sheetBorder};
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

    return (
        <>
            <Header pathname={`/projects/${projectName || 'New Project'}`} />

            <NewProjectSheet onSubmit={handleSubmit} noValidate={true}>
                <InputWrap>
                    <InputLabel htmlFor="projectName">Project name</InputLabel>
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
                    <Editor placeholder="Talk a little bit more about your project" />
                </InputWrap>
            </NewProjectSheet>
        </>
    );
};

export default NewProject;
