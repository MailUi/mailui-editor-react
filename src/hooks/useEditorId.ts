import {MailUiEditorProps} from "../MailUiEditor";
import {useMemo} from "react";

const useEditorId = (props: MailUiEditorProps) => {
    return useMemo(() => {
        return props.editorId || `editor-${++window.__mailui_newEditorId}`
    }, [props.editorId]);
};

export default useEditorId