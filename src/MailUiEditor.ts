/// <reference path="../node_modules/mailui-editor-types/embed.d.ts" />

import {CSSProperties} from 'react';

import Embed from 'embed/index';
import {Editor as EditorClass} from 'embed/Editor';

export type MailUi = typeof Embed;
export type MailUiOptions = Parameters<MailUi['createEditor']>[0];
export type MailUiEditor = InstanceType<typeof EditorClass>;

export interface MailUiEditorRef {
    editor: MailUiEditor | null;
}

export interface MailUiEditorProps {
    editorId?: string | undefined;
    minHeight?: number | string | undefined;
    options: MailUiOptions;
    scriptUrl?: string | undefined;
    style?: CSSProperties | undefined;

    onLoad?(mailui: MailUiEditor): void;

    onReady?(mailui: MailUiEditor): void;
}

declare global {
    const mailui: MailUi;

    interface Window {
        __mailui_newEditorId: number;
    }
}