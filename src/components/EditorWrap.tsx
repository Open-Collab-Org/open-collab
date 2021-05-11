import React from 'react';
import Editor from 'react-markdown-editor-lite';

const WrappedEditor = ({ editorRef, ...props }) => (
    // @ts-ignore The renderHtml function is passed through Editor.tsx
    <Editor {...props} ref={editorRef} />
);

export default (WrappedEditor as any) as typeof Editor;
