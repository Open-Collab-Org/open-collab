import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import HomeHeader from '@components/HomeHeader';
import { IProject } from '@types';
import useSWR from 'swr';
import Project from '@components/Project';

const Content = styled.div`
    font-family: ${props => props.theme.fonts.roboto};
    padding: 0 5%;
    margin: 70px auto;
    max-width: 974px;
    box-sizing: content-box;
`;

const SearchBar = styled.input`
    background: url(icons/search.svg) no-repeat 98% 50% padding-box;
    font-weight: 400;
    font-size: 24px;
    width: 100%;
    background-color: ${props => props.theme.colors.grayScale.five};
    border: none;
    border-radius: 4px;
    padding: 14px;
    margin-bottom: 60px;
    ::placeholder {
        color: ${props => props.theme.colors.grayScale.three};
    }
`;

const Tip = styled.label`
    font-size: 16px;
    color: ${props => props.theme.colors.grayScale.four};
    display: inline-flex;
    align-items: center;
`;

/**
 * Generate `n` projects objects, mocking the API response
 * @param n Number of projects to generate
 */
const getProjectsMock = (n: number): IProject[] => {
    if (n < 0) return [];
    const arr: IProject[] = [];
    for (let i = 0; i < n; i++) {
        arr.push({
            name: 'Lorem Ipsum',
            tags: ['Foo', 'Bar', 'Ipsum', 'Lorem'],
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
            id: i.toString(),
            skills: ['C++', 'Rust', 'JavaScript', 'HTML', 'CSS', 'AWS'],
            url: '/'
        });
    }
    return arr;
};

const Index = () => {
    // const { data, error } = useSWR('/projects'); // Use the API when it's available

    const data = getProjectsMock(10);

    return (
        <>
            <HomeHeader />

            <Content>
                <Tip htmlFor="query">
                    <Image
                        src="/icons/lightbulb.svg"
                        className="mr-1"
                        alt="Tip Icon"
                        height={20}
                        width={20}
                    />
                    Tip: you can search by project name, keyword and needed
                    skills.
                </Tip>
                <SearchBar
                    id="query"
                    name="q"
                    type="text"
                    placeholder="Search for a project"
                />

                {data.map((project, i) => (
                    <Project
                        name={project.name}
                        tags={project.tags}
                        shortDescription={project.shortDescription}
                        url={project.url}
                        skills={project.skills}
                        key={project.id}
                        addSeparatorBelow={!!data[i + 1]}
                    />
                ))}
            </Content>
        </>
    );
};

export default Index;
