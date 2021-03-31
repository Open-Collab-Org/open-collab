import React from 'react';
import { IProject } from '@types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { addQueryParam, isValueInQueryParam, removeQueryParam } from '@util';
import { Separator } from './styles/util';

const ProjectWrap = styled.div`
    font-family: ${props => props.theme.fonts.roboto};
`;

const Title = styled.span`
    font-size: 24px;
    line-height: 28px;
    color: black;
    font-weight: 400;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const ShortDescription = styled.p`
    color: ${props => props.theme.colors.grayScale.three};
    font-size: 18px;
    line-height: 26px;
    cursor: pointer;
    :hover {
        color: ${props => props.theme.colors.grayScale.two};
    }
`;

const Skills = styled.span`
    font-size: 18px;
    line-height: 21px;
    color: ${props => props.theme.colors.grayScale.two};
`;

const Skill = styled.span<{ active: boolean }>`
    font-weight: ${props => (props.active ? 500 : 'normal')};
    color: ${props =>
        props.active ? props.theme.colors.grayScale.one : 'inherit'};
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const Tags = styled.div`
    margin: 12px 0 24px 0;
`;

const Tag = styled.span<{ active: boolean }>`
    font-size: 16px;
    font-weight: 400;
    color: ${props =>
        props.active
            ? props.theme.colors.primary
            : props.theme.colors.grayScale.one};
    padding: 3px 9px;
    background-color: ${props => props.theme.colors.grayScale.five};
    border-radius: 5px;
    border: ${props =>
        props.active ? `1px solid ${props.theme.colors.primary}` : 'none'};
    margin-right: 10px;
    cursor: pointer;
    :hover {
        background-color: ${props => props.theme.colors.grayScale.four};
    }
`;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ProjectProps extends IProject {
    /**
     * Whether or not to add margin below the current project to make room to the next one
     */
    addSeparatorBelow: boolean;
}

const Project = ({
    url,
    shortDescription,
    name,
    tags,
    skills,
    addSeparatorBelow
}: Omit<ProjectProps, 'id'>) => {
    const router = useRouter();

    // Shift selected tags to the left
    tags.sort((a: string, b: string) => {
        if (isValueInQueryParam(router, 'tags', b)) {
            return 1;
        } else if (isValueInQueryParam(router, 'tags', a)) {
            return -1;
        } else {
            return 0;
        }
    });

    return (
        <ProjectWrap>
            <Link href={url}>
                <Title>{name}</Title>
            </Link>
            <Tags>
                {tags.map(tag => (
                    <Tag
                        key={tag}
                        active={isValueInQueryParam(router, 'tags', tag)}
                        onClick={() => {
                            if (isValueInQueryParam(router, 'tags', tag)) {
                                removeQueryParam(router, 'tags', tag);
                            } else {
                                addQueryParam(router, 'tags', tag);
                            }
                        }}
                    >
                        {tag}
                    </Tag>
                ))}
            </Tags>
            <Link href={url}>
                <ShortDescription>{shortDescription}</ShortDescription>
            </Link>
            <Skills>
                <b className="mr-1">Skills needed: </b>
                {skills.map((skill, i) => (
                    <span key={skill}>
                        <Skill
                            active={isValueInQueryParam(
                                router,
                                'skills',
                                skill
                            )}
                            onClick={() => {
                                if (
                                    isValueInQueryParam(router, 'skills', skill)
                                ) {
                                    removeQueryParam(router, 'skills', skill);
                                } else {
                                    addQueryParam(router, 'skills', skill);
                                }
                            }}
                        >
                            {skill}
                        </Skill>
                        {skills[i + 1] ? ', ' : ''}
                    </span>
                ))}
            </Skills>
            {addSeparatorBelow && <Separator />}
        </ProjectWrap>
    );
};

export default Project;
