import React from 'react';
import Editor from '@components/Editor';
import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
    .rc-md-editor { 
      border: none !important;
    }
    .rc-md-editor * {
      font-family: ${props => props.theme.fonts.roboto};
    }
    .rc-md-editor pre code {
      font-family: ${props => props.theme.fonts.robotoMono};
    }
    .section-container {
      padding: 0 !important;
    }
`;

const PreviewEditor = ({ value }: { value: string }) => (
    <>
        <Styles />
        <Editor value={value} config={{ view: { md: false, menu: false } }} />
    </>
);

export default PreviewEditor;
