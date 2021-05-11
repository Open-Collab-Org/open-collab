import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';
import 'react-markdown-editor-lite/lib/index.css';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import { EditorConfig } from 'react-markdown-editor-lite/share/var';

const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {} // eslint-disable-line no-empty
        }
        return ''; // use external default escaping
    }
}).disable('image');

const MDEditor = dynamic(() => import('@components/EditorWrap'), {
    ssr: false
});

const ForwardRefEditor = React.forwardRef((props, ref) => (
    <MDEditor {...props} editorRef={ref} />
));

const Styles = createGlobalStyle`
  span.button.button-type-image {
    display: none !important;
  }
  .rc-md-editor * {
    font-family: ${props => props.theme.fonts.roboto};
  }
  .rc-md-editor pre code {
    font-family: ${props => props.theme.fonts.robotoMono};
  }
  textarea.section-container.input {
    background-color: ${props => props.theme.colors.grayScale.seven} !important;
  }
  div.rc-md-navigation {
    background-color: white !important;
  }
`;

const Editor: typeof MDEditor = props => (
    <>
        <Styles />
        <ForwardRefEditor
            {...props}
            ref={props.editorRef}
            config={{
                shortcuts: true,
                ...props.config
            }}
            renderHTML={(text: string) => mdParser.render(text)}
        />
    </>
);

export default Editor;
