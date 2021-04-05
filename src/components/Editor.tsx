import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';
import 'react-markdown-editor-lite/lib/index.css';

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
});

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
});

const Editor: typeof MdEditor = props => (
    <MdEditor
        {...props}
        style={{ height: '500px' }}
        renderHTML={text => mdParser.render(text)}
    />
);

export default Editor;
