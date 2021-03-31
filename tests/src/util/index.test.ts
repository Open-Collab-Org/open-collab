import {
    addQueryParam,
    doesQueryParamExist,
    isValueInQueryParam,
    removeQueryParam
} from '@util';
import { NextRouter } from 'next/router';

describe('Suite Util', () => {
    describe('Query Params', () => {
        let router: NextRouter;
        beforeEach(() => {
            // @ts-ignore Mocking the Next Router
            router = {
                pathname: '/',
                push: jest.fn(),
                query: {}
            };
        });

        describe('Add', () => {
            it("should create a query param if it doesn't exist already", () => {
                addQueryParam((router as never) as NextRouter, 'foo', 'bar');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe('bar');
            });

            it('should add a value to a query param if the second already exists', () => {
                router.query = {
                    foo: 'Lorem'
                };
                addQueryParam((router as never) as NextRouter, 'foo', 'Ipsum');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe(encodeURIComponent('Lorem,Ipsum'));
            });

            it('should not add a value to a query param if the value already exists on the query', () => {
                router.query = {
                    foo: 'Lorem%2CBar'
                };
                addQueryParam((router as never) as NextRouter, 'foo', 'Lorem');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query).toStrictEqual(router.query);
            });

            it('should not overwrite current values when adding a query param if append is set to true', () => {
                router.query = {
                    foo: 'Lorem%2CBar'
                };
                addQueryParam(
                    (router as never) as NextRouter,
                    'foo',
                    'Ipsum',
                    true
                );
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe(encodeURIComponent('Lorem,Bar,Ipsum'));
            });

            it('should overwrite current values when adding a query param if append is set to false', () => {
                router.query = {
                    foo: 'Lorem%2CBar'
                };
                addQueryParam(
                    (router as never) as NextRouter,
                    'foo',
                    'Ipsum',
                    false
                );
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe('Ipsum');
            });

            it('should return uri safe values', () => {
                const unsafe = 'some uri *$&!@*( -// unsafe string';
                addQueryParam((router as never) as NextRouter, 'foo', unsafe);
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe(encodeURIComponent(unsafe));
            });
        });

        describe('Remove', () => {
            beforeEach(() => {
                router.query = {
                    foo: 'bar',
                    lorem: 'ipsum'
                };
            });

            afterAll(() => {
                router.query = {};
            });

            it('should not modify the query when removing a value that is not present in such query', () => {
                removeQueryParam(router, 'lorem', 'bar');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.lorem).toBe('ipsum');
            });

            it("should not modify the query when trying to remove a value from a parameter that doesn't exist", () => {
                removeQueryParam(router, 'notReallyThere', 'bar');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query).toStrictEqual(router.query);
            });

            it('should remove only the specified value', () => {
                router.query.foo = encodeURIComponent('bar,foo');
                removeQueryParam(router, 'foo', 'bar');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.foo).toBe('foo');
            });

            it('should return uri safe values', () => {
                const unsafe = 'some uri *$&!@*( -// unsafe string';
                const alsoUnsafe = 'please $enCo*(&@de mE!';
                router.query.unsafe = encodeURIComponent(
                    `${unsafe},${alsoUnsafe}`
                );
                removeQueryParam(router, 'unsafe', unsafe);
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query.unsafe).toBe(encodeURIComponent(alsoUnsafe));
            });

            it('should remove a query param if the removed value was the only one present', () => {
                removeQueryParam(router, 'foo', 'bar');
                const { query } = (router.push as jest.Mock).mock.calls[0][0];
                expect(query).toStrictEqual({ lorem: 'ipsum' });
            });
        });

        describe('Verify', () => {
            it('should report correctly if a value is in a query param', () => {
                router.query.foo = encodeURIComponent('foo,bar,lorem');

                expect(isValueInQueryParam(router, 'foo', 'lorem')).toBe(true);
                expect(isValueInQueryParam(router, 'foo', 'ipsum')).toBe(false);
            });

            it('should report correctly if a query param exists in the query', () => {
                router.query = {
                    foo: ''
                };

                expect(doesQueryParamExist(router, 'foo')).toBe(true);
                expect(doesQueryParamExist(router, 'bar')).toBe(false);
            });
        });
    });
});
