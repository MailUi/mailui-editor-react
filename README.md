# React MailUi Editor

Enhance your app with [MailUi](https://mailui.co) user-friendly [React.js](https://react.dev) _wrapper component_ for
designing emails. Enjoy
it's easy drag-and-drop editor, making email creation a breeze!

[![React MailUi Editor](https://cdn.mailui.co/photos/mailui-editor-preview.png)](http://react-mailui-editor.vercel.com)

## Table of contents

- [Live Demo](#live-demo)
- [Getting started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Methods](#methods)
    - [Properties](#properties)
- [Browser support](#browser-support)
    - [React](#react)
- [Localization](#localization)
- [License](#license)

## Live Demo

A minimal demo page can be found in `example` directory.

- Live demo link: http://react-mailui-editor.vercel.com
- Source Code: https://github.com/MailUi/react-mailui-editor/tree/master/example

## Getting started

### Installation

Install it from npm and include it in your React build process

```
npm install react-mailui-editor --save
```

OR

```
yarn add react-mailui-editor
```

### Usage

Require the MailUiEditor component and render it with JSX:

```javascript
import React, {useRef} from 'react';
import MailUiEditor, {MailUiEditorRef, MailUiEditorProps} from 'react-mailui-editor';

const ExampleComponent = () => {
    const ref = useRef < MailUiEditorRef > (null);

    const exportHtml = () => {
        const mailui = ref.current?.editor;

        mailui?.exportHtml((data) => {
            const {design, html} = data;
            console.log('exportHtml', html);
        });
    };

    const onReady: MailUiEditorProps['onReady'] = (mailui) => {
        // Editor is ready
        // You can load your template here;
        // The design JSON can be obtained by calling mailui.loadDesign(callback) or mailui.exportHtml(callback)

        // For example:
        // const templateJson = { DESIGN JSON GOES HERE };
        // mailui.loadDesign(templateJson);
    };

    return (
        <div>
            <div>
                <button onClick={exportHtml}>Export HTML</button>
            </div>

            <EmailEditor ref={emailEditorRef} onReady={onReady}/>
        </div>
    );
};

export default ExampleComponent;
```

See the [example source](https://github.com/MailUi/react-mailui-editor/blob/master/example/src/basic/index.tsx) for a
reference implementation.

### Methods

All MailUi methods are available in the editor instance (`emailEditorRef.current.editor`). See
the [MailUi Docs](https://docs.mailui.co/) for more information, or log the object in the console to explore it. Here
are the most used ones:

| method         | params              | description                                             |
|----------------|---------------------|---------------------------------------------------------|
| **loadDesign** | `Object data`       | Takes the design JSON and loads it in the editor        |
| **saveDesign** | `Function callback` | Returns the design JSON in a callback function          |
| **exportHtml** | `Function callback` | Returns the design HTML and JSON in a callback function |

### Properties

- `editorId` {`String`} HTML div id of the container where the editor will be embedded (optional)
- `minHeight` {`String`} minimum height to initialize the editor with (default 500px)
- `onLoad` {`Function`} called when the editor instance is created
- `onReady` {`Function`} called when the editor has finished loading
- `options` {`Object`} options passed to the MailUi editor instance (default {})
    - See the [MailUi Docs](https://docs.mailui.co/docs/getting-started#configuration-options) for all available
      options.
- `style` {`Object`} style object for the editor container (default {})

## Browser support

MailUi supports all modern browsers. It is tested with the latest versions of Chrome, Edge, Safari, Firefox, and
Opera.

The following browsers are supported out of the box in MailUi v0.0.1.beta:

- Chrome ≥40
- Edge ≥17
- Safari ≥11.1
- Firefox ≥44
- Opera ≥27

[//]: # (- IE &#40;not supported&#41;)

[//]: # (If you need to support older browsers, you will need to use React-PDF v6 or v5.)

Please be aware that the MailUi editor is currently not compatible with `Internet Explorer`, and there are no plans to
add support for it in the future.

### React

To use the latest version of MailUi editor, your project needs to use React 15.5 or later.

If you use an older version of React, please refer to the table below to a find suitable MailUi version.

| React version | Newest compatible MailUi version |
|---------------|----------------------------------|
| ≥15.5         | latest                           |

[//]: # (| ≥16.8         | latest                              |)

[//]: # (| ≥16.3         | 5.x                                 |)

## Localization

You can submit new language translations by creating a PR on this GitHub
repo: https://github.com/MailUi/mailui-editor-translations.
Translations managed by [PhraseApp](https://phraseapp.com)

### License

Copyright (c) 2023 MailUi. [MIT](LICENSE) Licensed.