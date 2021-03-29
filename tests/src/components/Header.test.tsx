/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from '@components/Header';
import * as nextRouter from 'next/router';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import light from '@themes/light';

const useRouter = jest.spyOn(nextRouter, 'useRouter').mockReturnValue({
    pathname: '/foo/bar'
} as any);

interface Span {
    props: {
        className: string;
    };
    children: string[];
}

const getTreeJson = () =>
    renderer
        .create(
            <ThemeProvider theme={light}>
                <Header />
            </ThemeProvider>
        )
        .toJSON() as renderer.ReactTestRendererJSON;

describe('Suite Header', () => {
    let tree: renderer.ReactTestRendererJSON;
    beforeEach(() => {
        tree = getTreeJson();
    });

    afterEach(() => {
        useRouter.mockReturnValue({
            pathname: '/foo/bar'
        } as any);
    });

    it('should use the url as path', () => {
        const expected = ['Open Collab', '/', 'Foo', '/', 'Bar'];

        tree.children!.forEach((span, i) => {
            expect(expected[i]).toBe(((span as any) as Span).children[0]);
        });
    });

    it('should apply a different style for the last element of the path', () => {
        const twoToLast: Span = tree.children![
            tree.children!.length - 3
        ] as any;
        const oneToLast: Span = tree.children![
            tree.children!.length - 2
        ] as any;
        const last: Span = tree.children![tree.children!.length - 1] as any;

        expect(oneToLast.props.className).toBe(twoToLast.props.className);
        expect(last.props.className).not.toBe(oneToLast.props.className);
    });

    it('should replace dashes with spaces and capitalize both words', () => {
        useRouter.mockReturnValue({
            pathname: '/foo-bar/ipsum-lorem'
        } as any);

        tree = getTreeJson();

        expect(((tree.children![4] as any) as Span).children[0]).toBe(
            'Ipsum Lorem'
        );
        expect(((tree.children![2] as any) as Span).children[0]).toBe(
            'Foo Bar'
        );
    });

    it.todo('should prioritize pathname provided by props over the url');
});
