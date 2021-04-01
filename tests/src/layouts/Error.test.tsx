/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import light from '@themes/light';
import Error from '@layouts/Error';
import * as nextRouter from 'next/router';

// Remove the header from the page since it has its own tests
jest.mock('@components/Header', () => ({
    __esModule: true,
    default: () => <></>
}));

jest.spyOn(nextRouter, 'useRouter').mockImplementation(
    () =>
        (({
            back: jest.fn()
        } as any) as nextRouter.NextRouter)
);

interface MessageElement {
    type: 'p';
    props: {
        className: string;
    };
    children: string[];
}

const getTreeJson: (code?: number) => renderer.ReactTestRendererJSON = (
    code = undefined
) =>
    renderer
        .create(
            <ThemeProvider theme={light}>
                <Error code={code} />
            </ThemeProvider>
        )
        .toJSON() as renderer.ReactTestRendererJSON;

describe('Suite Error', () => {
    let tree: renderer.ReactTestRendererJSON;
    beforeEach(() => {
        tree = getTreeJson();
    });

    it('should display the error message correctly', () => {
        tree = getTreeJson(404);
        const message = tree.children!.find(
            e => (e as MessageElement).type === 'p'
        ) as MessageElement;

        expect(message.children[0]).toBe(
            "It seems like the page you are looking for doesn't exist"
        );
    });

    it('should use the default message if no error code was provided', () => {
        const message = tree.children!.find(
            e => (e as MessageElement).type === 'p'
        ) as MessageElement;

        expect(message.children[0]).toBe(
            'An unexpected error has occurred. Please try again'
        );
    });
});
