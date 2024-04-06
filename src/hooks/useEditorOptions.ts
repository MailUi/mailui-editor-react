import {MailUiEditorProps} from "../MailUiEditor";
import {useMemo} from "react";
import pkg from "../../package.json";

const useEditorOptions = (props: MailUiEditorProps, editorId: string) => {
    return useMemo(() => {
        const options: MailUiEditorProps['options'] = {
            ...(props.options || {}),
            apiKey: props.options.apiKey,
            apiSecret: props.options.apiSecret,
            appearance: props.options?.appearance,
            displayMode: props.options?.displayMode || 'email',
            locale: props.options?.locale,
            projectId: props.options?.projectId,
            tools: props.options?.tools,
            id: editorId,
            source: {
                name: pkg.name,
                version: pkg.version,
            },
        };
        return options;
    }, [props.options, editorId]);
};

export default useEditorOptions
