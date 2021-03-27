import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            link: string;
            danger: string;
            darkGraffiti: string;
            background: string;
        };
    }
}
