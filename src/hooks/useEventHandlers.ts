import {MailUiEditor as MailUiEditorClass, MailUiEditorProps} from "../MailUiEditor";
import {useEffect} from "react";

const useEventHandlers = (editor: MailUiEditorClass | null, props: MailUiEditorProps) => {
    const eventProps = Object.keys(props).filter(propName => /^on/.test(propName));

    useEffect(() => {
        if (!editor) return;

        props.onLoad?.(editor);

        eventProps.forEach((eventProp: string) => {
            // @ts-ignore
            if (/^on/.test(eventProp) && eventProp !== 'onLoad' && eventProp !== 'onReady' && typeof props[eventProp] === 'function') {
                // @ts-ignore
                editor.addEventListener(eventProp, props[eventProp]);
            }
        });

        if (props.onReady) {
            editor.addEventListener('editor:ready', () => {
                // @ts-ignore
                props.onReady(editor);
            });
        }
    }, [editor, Object.keys(eventProps).join(',')]);
};

export default useEventHandlers
