import {MailUiEditor as MailUiEditorClass, MailUiEditorProps} from "../MailUiEditor";
import React, {useEffect} from "react";
import {Editor} from "embed/Editor";

const useEditorInitialization = (editor: MailUiEditorClass | null, setEditor: {
    (value: React.SetStateAction<Editor | null>): void;
    (arg0: Editor): void;
}, options: MailUiEditorProps['options'], hasLoadedEmbedScript: boolean) => {
    useEffect(() => {
        if (!hasLoadedEmbedScript) return;
        editor?.destroy();
        setEditor(mailui.createEditor(options || {}));
    }, [JSON.stringify(options), hasLoadedEmbedScript]);
};

export default useEditorInitialization