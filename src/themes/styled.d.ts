import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            link: string;
            danger: string;
            darkGraffiti: string;
            background: string;
            sheet: string;
            sheetBorder: string;
            fieldBg: string;
            fieldBorder: string;
            grayOne: string;
        };
        fonts: {
            // TODO Change name for title, primary, etc, ...
            raleway: string;
            roboto: string;
            robotoMono: string;
        };
    }
}
