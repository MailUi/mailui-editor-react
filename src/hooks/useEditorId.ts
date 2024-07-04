import {MailUiEditorProps} from "../MailUiEditor";
import {useMemo} from "react";

const clientWindow = typeof window === 'undefined' ? { __mailui_newEditorId: 0 } : window
clientWindow.__mailui_newEditorId = clientWindow.__mailui_newEditorId || 0;

const useEditorId = (props: MailUiEditorProps) => {
    return useMemo(() => {
        return props.editorId || `editor-${++window.__mailui_newEditorId}`
    }, [props.editorId]);
};

export default useEditorId