import Header from '@components/Header';
import { Input, InputLabel, InputWrap, TextArea } from '@styles/inputs';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Editor from '@components/Editor';
import { PublishButton } from '@components/styles/buttons';

const Title = styled.h1`
    font-family: ${props => props.theme.fonts.roboto};
    font-size: 24px;
    line-height: 28px;
    margin: 0;
`;

const HeaderWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 43px;
`;

const ButtonsWrap = styled.div`
    display: flex;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 55px auto;
`;

const NewProjectSheet = styled.form`
    min-width: 958px;
    padding: 45px 104px;
    background-color: white;
    border: 2px solid ${props => props.theme.colors.sheetBorder};
    margin-bottom: 55px;
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

    const editorRef = useRef();

    const publishProject = () => {
        const project = {
            githubLink: 'string',
            longDescription: 'string',
            name: 'string',
            shortDescription: 'string',
            tags: ['string']
        };
        console.log(editorRef.current);
    };

    return (
        <>
            <Header pathname={`/projects/${projectName || 'New Project'}`} />

            <Container>
                <NewProjectSheet
                    onSubmit={e => e.preventDefault()}
                    noValidate={true}
                >
                    <HeaderWrap>
                        <Title>Create project</Title>
                        <ButtonsWrap>
                            <PublishButton onClick={publishProject}>
                                Publish
                            </PublishButton>
                        </ButtonsWrap>
                    </HeaderWrap>
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
                        <Editor editorRef={editorRef} style={{ height: 350 }} />
                    </InputWrap>
                </NewProjectSheet>
            </Container>
        </>
    );
};

export default NewProject;
