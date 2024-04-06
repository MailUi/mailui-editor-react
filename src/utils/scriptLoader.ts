import apiUrl from "./apiUrl";

const defaultScriptUrl = apiUrl.API_BASE_URL;
const callbacks: Function[] = [];
let loaded: boolean = false;

const isScriptInjected = (scriptUrl: string): boolean => {
    const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll('script');
    let injected: boolean = false;

    scripts.forEach((script: HTMLScriptElement) => {
        if (script.src.includes(scriptUrl)) {
            injected = true;
        }
    });

    return injected;
};

const addCallback = (callback: Function): void => {
    callbacks.push(callback);
};

const runCallbacks = (): void => {
    if (loaded) {
        let callback: Function | undefined;

        while ((callback = callbacks.shift())) {
            callback();
        }
    }
};

export const scriptLoader = (
    callback: Function,
    scriptUrl: string = defaultScriptUrl
): void => {
    addCallback(callback);

    if (!isScriptInjected(scriptUrl)) {
        const embedScript: HTMLScriptElement = document.createElement('script');
        embedScript.setAttribute('src', scriptUrl);
        embedScript.onload = () => {
            loaded = true;
            runCallbacks();
        };
        document.head.appendChild(embedScript);
    } else {
        runCallbacks();
    }
};
