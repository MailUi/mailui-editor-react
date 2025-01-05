import React, {useRef, useState} from "react";
import MailUiEditor, {MailUiEditorProps, MailUiEditorRef} from "../../src";
import packageJson from "../package.json";
import sampleTemplate from "./sampleTemplate.json";
import unlayerTemplate from "./unlayer-template.json";
import {FaDesktop, FaMobile, FaRedoAlt, FaTablet, FaUndoAlt} from "react-icons/fa";
import {generateSignature} from "../utils";

const classNames = (...args: (string | undefined | null | false | number)[]): string => {
    return args.filter(arg => typeof arg === 'string').join(' ');
};

const displayConditions = [
    {
        label: "Men",
        description: "All man customers",
        key: "ismen",
    },
    {
        label: "Women",
        description: "All women customers",
        key: "iswomen",
    },
    {
        label: "Children",
        description: "All children customers",
        key: "ischild",
    }
]

const BasicExample = () => {
    const mailUiEditorRef = useRef<MailUiEditorRef | null>(null);
    const [preview, setPreview] = useState(false);
    const [device, setDevice] = useState("desktop");

    const saveDesign = () => {
        const mailui = mailUiEditorRef.current?.editor;

        mailui?.saveDesign((design: object) => {
            console.log("saveDesign", design);
            console.log("Design JSON has been logged in your developer console.");
        });
    };

    const exportHtml = () => {
        const mailui = mailUiEditorRef.current?.editor;

        console.log(mailui);

        mailui?.exportHtml((data: object) => {
            // const { design, html } = data;
            console.log("exportHtml", data);
            console.log("Output HTML has been logged in your developer console.");
        }, {minify: true});
    };

    const togglePreview = () => {
        const mailui = mailUiEditorRef.current?.editor;

        if (preview) {
            mailui?.hidePreview();
            setPreview(false);
        } else {
            mailui?.showPreview("desktop");
            setPreview(true);
        }
    };

    const undo = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.undo();
    };

    const redo = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.redo();
    };

    const toggleDevice = (device: string) => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.setDevice(device);
        setDevice(device);
    };

    const setMergeTags = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.setMergeTags({
            first_name: {
                label: "First name",
                value: "{{ first_name }}",
            },
            last_name: {
                label: "Last name",
                value: "{{ last_name }}",
            },
            shopping: {
                label: "Shipping address-",
                margeTags: {
                    'shipping_address.city': {
                        label: "City 1",
                        value: "{{ shipping_address.city }}",
                    },
                    'shipping_address.state': {
                        label: "State 1",
                        value: "{{ shipping_address.state }}",
                    },
                    'shipping_address.country': {
                        label: "Country 1",
                        value: "{{ shipping_address.country }}",
                    },
                }
            },
        });
    };

    const loadTemplate = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.loadTemplate(12345);

    };

    const loadDesign = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.loadDesign(sampleTemplate);
        console.log("dfsdf");
    };

    const loadConvertDesign = () => {
        const mailui = mailUiEditorRef.current?.editor;
        mailui?.loadDesign(unlayerTemplate);
        console.log("Convert Design");
    };

    const loadListener = () => {
        const mailui = mailUiEditorRef.current?.editor;

        console.log("loadListener", mailui);
    };

    const onDesignLoad = (data: object) => {
        console.log("onDesignLoad", data);
    };

    const onLoad: MailUiEditorProps['onLoad'] = (mailui) => {
        // console.log("onLoad", mailui);

        // mailui.addEventListener("design:updated", (data: {
        //     type: string
        // }) => {
        //     const type = data.type; // type will be of type string
        //     console.log("__design:updated__", data, type);
        // });

        mailui.addEventListener("design:updated", function () {
            mailui.exportJson(function (data) {
                console.log('JSON', data);
            });
        });


        mailui.addEventListener("design:loaded", onDesignLoad);
        // mailui.loadDesign({});
        // mailui.addEventListener("design:updated", function (data: object) {
        //     // var type = data.type; // html:updated
        //     console.log("__design:updated__", data);
        // });
        mailui.addEventListener("content:modified", function (data: object) {
            // var type = data.type; // html:updated
            console.log("__content:modified__", data);
        });
        mailui.addEventListener("device:changed", function (data: { device: string }) {
            setDevice(data.device);
            console.log(data.device)
        });
        mailui.addEventListener("element:selected", function (data: object) {
            console.log("element:selected", data);
        });
        mailui.addEventListener("element:removed", function (data: object) {
            console.log("element:removed", data);
        });
        mailui.registerProvider("image:onUpload", (params: object, done: Function) => {
            console.log("image:onUpload", params);

            setTimeout(() => {
                done({
                    id: 111,
                    src: "https://api.slingacademy.com/public/sample-photos/9.jpeg",
                    fileName: '',
                    alt: ''
                });
            }, 3000);
        });

        mailui.registerCallback("image:onRemove", function (image: object, done: Function) {
            // image will include id, userId and projectId
            console.log(image);

            // call this when image has been deleted
            done();
        });

        mailui.registerProvider("userUploads", async (params: { page: number, perPage: number }, done: Function) => {
            var page = params.page || 1;
            var lastPage = 5;
            var perPage = params.perPage || 20;
            var total = 100;

            console.log("params", params);

            /**
             * Load images for page X from your server here...
             */

            const images: any[] = []
            // const response = await fetch(
            //         "https://api.slingacademy.com/v1/sample-data/photos?offset=0&limit=20"
            //     );
            // const {photos: images} = await response.json();

            done(images, {page, lastPage, perPage, total});
        });

        /**
         * Block
         */
        mailui.registerProvider("block:collections", async (params: {}, done: Function) => {
            console.log("params", params);

            /**
             * Load images for page X from your server here...
             */
            const collections: any[] = []
            done(collections);
        });
        mailui.registerProvider("block:collectionData", async (params: {}, done: Function) => {
            console.log("params", params);

            /**
             * Load images for page X from your server here...
             */
            const collectionData = 'dataElementObject'
            setTimeout(() => {
                done(collectionData);
            }, 4000)
        });
        mailui.registerProvider("block:saved", async (params: object, done: Function) => {
            console.log("block:onSave", params);
            setTimeout(() => {
                done({name: 'saved block', id: 111});
            }, 3000);
        });
        mailui.registerCallback("block:removed", async (params: object, done: Function) => {
            console.log("block:onSave", params);
            setTimeout(() => {
                done();
            }, 3000);
        });
        mailui.registerCallback("block:saveAuthAlert", async (params: object, done: Function) => {
            console.log("block:saveAuthAlert", params);
            done(true);
        });
        // mailui.registerCallback("displayCondition", async (params: object, done: Function) => {
        //     console.log("displayCondition", params?.condition);
        //
        //     done({
        //         label: "Men",
        //         description: "All man customers",
        //         key: "ismen",
        //     })
        // });

        mailui.registerCallback("previewHtml", async (params: object, done: Function) => {
            console.log("previewHtml", params);

            var conditionKey = prompt(
                `Please enter a condition key: ${displayConditions
                    .map((e) => e.key)
                    .join(", ")}`,
                displayConditions[0]?.key
            );

            if (conditionKey === null || conditionKey === "") {
                console.log("User cancelled the prompt.");
            }

            var data = displayConditions.reduce((acc, condition) => {
                acc[condition.key] = conditionKey &&
                    (condition.key === conditionKey ||
                    condition.key === conditionKey.toLowerCase())
                return acc;
            }, {});

            done({
                dataMap: data
            })
        });

        mailui?.setDisplayConditions(displayConditions)

        // mailui?.registerCustomTool({
        //     initialProperties: {},
        //     settings: {
        //         label: "Custom Tool",
        //         icon: <div>I</div>,
        //     },
        //     dragPreview: null,
        //     toolbarComponent: () => {
        //         return <div><h1>Hello how are you</h1></div>
        //     },
        //     elementComponent: () => {
        //         return <div><h1>Hello how are you</h1></div>
        //     },
        //     previewElementComponent: () => {
        //         return <div><h1>Hello how are you</h1></div>
        //     },
        //     styleHelpers: null
        // })
    };

    const onReady: MailUiEditorProps['onReady'] = (mailui) => {
        console.log("onReady", mailui);
    };

    const signature = generateSignature();

    return (
        <main className="App">
            <nav className="App-header">
                <h1>React Email Editor v{packageJson.version} (Demo)</h1>

                <ul className="App-links">
                    <li>
                        <button
                            className={classNames(
                                "btn btn-sm !p-0 !w-[32px]",
                                device === "desktop" ? "btn-primary" : "btn-secondary"
                            )}
                            onClick={() => toggleDevice("desktop")}
                        >
                            <FaDesktop/>
                        </button>
                        <button
                            className={classNames(
                                "btn btn-sm !p-0 !w-[32px]",
                                device === "tablet" ? "btn-primary" : "btn-secondary"
                            )}
                            onClick={() => toggleDevice("tablet")}
                        >
                            <FaTablet/>
                        </button>
                        <button
                            className={classNames(
                                "btn btn-sm !p-0 !w-[32px]",
                                device === "mobile" ? "btn-primary" : "btn-secondary"
                            )}
                            onClick={() => toggleDevice("mobile")}
                        >
                            <FaMobile/>
                        </button>
                    </li>
                    <li>
                        <button
                            className="btn btn-sm btn-secondary !p-0 !w-[32px]"
                            onClick={undo}
                        >
                            <FaUndoAlt/>
                        </button>
                        <button
                            className="btn btn-sm btn-secondary !p-0 !w-[32px]"
                            onClick={redo}
                        >
                            <FaRedoAlt/>
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-sm btn-secondary" onClick={loadListener}>
                            Load Listener
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={setMergeTags}>
                            Set Tags
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={loadTemplate}>
                            Load Template
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={loadConvertDesign}>
                            Convert Unlayer
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={loadDesign}>
                            Load Design
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={togglePreview}>
                            {preview ? "Hide" : "Show"} Preview
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={saveDesign}>
                            Save Design
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={exportHtml}>
                            Export HTML
                        </button>
                    </li>
                </ul>
            </nav>
            <MailUiEditor
                ref={mailUiEditorRef}
                onLoad={onLoad}
                onReady={onReady}
                minHeight="calc(100vh - 57px)"
                scriptUrl={
                    process.env.NODE_ENV === "production"
                        ? "https://editor.mailui.co/embed.min.js"
                        : "https://editor.mailui.co/embed.local.min.js"
                }
                options={{
                    signature,
                    projectId: process.env.REACT_APP_MAILUI_PROJECT_ID,

                    defaultDevice: "desktop",
                    devices: ["desktop", "tablet", "mobile"],
                    appearance: {
                        panels: {
                            tools: {
                                dock: "left",
                                compact: false,
                            },
                        },
                    },
                    features: {
                        stockImages: {
                            enabled: true,
                            safeSearch: true,
                            // defaultSearchTerm: "people",
                        },
                        stockBlocks: {
                            enabled: true,
                            safeFilter: true,
                        },
                        saveToBlock: {
                            enabled: true,
                            authAlert: true,
                        },
                        displayCondition: {
                            enabled: true,
                        },
                    },
                    excludeTools: [],
                    mergeTags: [
                        {
                            label: "First name",
                            value: "{{ first_name }}",
                        },
                        {
                            label: "Last name",
                            value: "{{ last_name }}",
                        },
                        {
                            label: "Shipping address",
                            margeTags: [
                                {
                                    label: "City",
                                    value: "{{ shipping_address.city }}",
                                },
                                {
                                    label: "State",
                                    value: "{{ shipping_address.state }}",
                                },
                                {
                                    label: "Country",
                                    value: "{{ shipping_address.country }}",
                                },
                            ],
                        },
                    ],
                    protectedModules: [],
                    customJS: [
                        'http://localhost:3000/custom.js'
                    ]
                }}
            />
        </main>
    );
};

export default BasicExample;
