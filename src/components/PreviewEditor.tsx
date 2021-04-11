import React, { useEffect } from 'react';
import Editor from '@components/Editor';

const PreviewEditor = ({ value }: { value: string }) => {
    useEffect(() => {
        const editor = document.querySelector(
            '.rc-md-editor'
        ) as HTMLDivElement;
        console.log(editor);

        /*
         * Remove toolbar
         * console.log(editor.getElementsByClassName('rc-md-navigation')[0]);
         */
    }, [document.querySelector('.rc-md-editor')]);
    return (
        <>
            <Editor value={value} />
        </>
    );
};

export default PreviewEditor;
