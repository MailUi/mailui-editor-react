import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MailUiEditor, MailUiEditorRef} from "../src/index";

describe('it', () => {
  it('renders without crashing', () => {
    // Arrange
    const ref = React.createRef<MailUiEditorRef>(); // Create a valid ref object

    // @ts-ignore
    const div = document.createElement('div');
    ReactDOM.render(<MailUiEditor options={{apiKey: '1234', apiSecret: '1234'}} ref={ref}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});