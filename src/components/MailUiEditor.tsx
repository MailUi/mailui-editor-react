import React, {useEffect, useImperativeHandle, useState} from "react";
import {MailUiEditor as MailUiEditorClass, MailUiEditorProps, MailUiEditorRef} from '../MailUiEditor';

// utils
import {scriptLoader} from '../utils/scriptLoader';

// hooks
import useEditorId from "../hooks/useEditorId";
import useEditorOptions from "../hooks/useEditorOptions";
import useEditorInitialization from "../hooks/useEditorInitialization";
import useEventHandlers from "../hooks/useEventHandlers";

window.__mailui_newEditorId = window.__mailui_newEditorId || 0;

const MailUiEditor = React.forwardRef<MailUiEditorRef, MailUiEditorProps>(
    (props, ref) => {
        const {scriptUrl, minHeight = 500, style = {}} = props;
        const [editor, setEditor] = useState<MailUiEditorClass | null>(null);
        const [hasLoadedEmbedScript, setHasLoadedEmbedScript] = useState(false);

        const editorId = useEditorId(props);
        const options = useEditorOptions(props, editorId);

        useImperativeHandle(ref, () => ({editor}), [editor]);

        useEffect(() => {
            return () => {
                editor?.destroy();
            };
        }, [editor]);

        useEffect(() => {
            setHasLoadedEmbedScript(false);
            scriptLoader(() => setHasLoadedEmbedScript(true), scriptUrl);
        }, [scriptUrl]);

        useEditorInitialization(editor, setEditor, options, hasLoadedEmbedScript);
        useEventHandlers(editor, props);

        return (
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    minHeight: minHeight,
                }}
                data-testid="mailui-editor"
            >
                <div id={editorId} style={{...style, flex: 1}}/>
            </div>
        );
    }
);

export default MailUiEditor;
