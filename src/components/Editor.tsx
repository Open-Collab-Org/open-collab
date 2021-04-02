import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { createGlobalStyle } from 'styled-components';
import * as ReactQuill from 'react-quill';
import 'highlight.js/styles/rainbow.css';
import { EditorSkeleton } from '@styles/skeleton';

const QuillSnowOverwrite = createGlobalStyle`
  div.ql-container.ql-snow {
    height: auto;
  }
  div.ql-container.ql-snow,
  div.ql-toolbar.ql-snow {
    border-color: #cfcfcf;
  }
  div.ql-editor {
    background-color: ${props => props.theme.colors.grayScale.seven};
    min-height: 200px;
  }
  .ql-editor.ql-blank::before {
    font-family: ${props => props.theme.fonts.roboto};
    color: #d7d7d7;
    font-size: 16px;
    font-style: normal;
  }
  .ql-editor {
    font-size: 18px;
  }
`;

const Quill = dynamic(import('react-quill'), {
    ssr: false,
    loading: EditorSkeleton
});

/**
 * Quill editor instance with OpenCollab style pattern. The editor should **always**
 * be imported as an dynamic component - Quill is deeply linked to the DOM and can't
 * be rendered in the server.
 *
 * It is **crucial** to pass `{ ssr: false }` to the `dynamic` function.
 *
 * @example
 * import dynamic from 'next/dynamic';
 * const Editor = dynamic(() => import('@components/Editor'), { ssr: false });
 *
 * @see https://nextjs.org/docs/advanced-features/dynamic-import
 */
const Editor: typeof Quill = props => {
    /*
     * https://quilljs.com/docs/modules/toolbar/
     * https://quilljs.com/docs/formats/
     */
    const defaultToolbarOptions = [
        [{ header: [1, 2, false] }],

        ['bold', 'italic', 'underline'],
        ['code', 'code-block'],
        ['image'],

        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }]
    ];

    const editorModules = {
        ...props.modules,
        toolbar: {
            container: props.modules?.toolbar || defaultToolbarOptions,
            handlers: {
                image: imageHandler
            }
        },
        syntax: true
    };

    /*
     * Custom toolbar icons
     * https://github.com/quilljs/quill/issues/1099#issuecomment-258560326
     * https://github.com/quilljs/quill/issues/3165
     */
    const icons = ReactQuill.Quill.import('ui/icons');
    icons['code-block'] =
        '<svg viewbox="0 -2 15 18">\n' +
        '\t<polyline class="ql-even ql-stroke" points="2.48 2.48 1 3.96 2.48 5.45"/>\n' +
        '\t<polyline class="ql-even ql-stroke" points="8.41 2.48 9.9 3.96 8.41 5.45"/>\n' +
        '\t<line class="ql-stroke" x1="6.19" y1="1" x2="4.71" y2="6.93"/>\n' +
        '\t<polyline class="ql-stroke" points="12.84 3 14 3 14 13 2 13 2 8.43"/>\n' +
        '</svg>';

    // https://stackoverflow.com/questions/59602182/quill-add-image-url-instead-of-uploading-it
    function imageHandler(this: any) {
        const tooltip = this.quill.theme.tooltip;
        const originalSave = tooltip.save;
        const originalHide = tooltip.hide;

        tooltip.save = function () {
            const range = this.quill.getSelection(true);
            const value = this.textbox.value;
            if (value) {
                this.quill.insertEmbed(range.index, 'image', value, 'user');
            }
        };
        // Called on hide and save.
        tooltip.hide = function () {
            tooltip.save = originalSave;
            tooltip.hide = originalHide;
            tooltip.hide();
        };
        tooltip.edit('image');
        tooltip.textbox.placeholder = 'Image URL';
    }

    return (
        <>
            <QuillSnowOverwrite />
            <Quill {...props} modules={editorModules} />
        </>
    );
};

export default Editor;
