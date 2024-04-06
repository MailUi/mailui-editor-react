import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BasicExample from "./basic";

const App = () => {
  return (
    <>
        <BasicExample/>
    </>
  );
};

// @ts-ignore
ReactDOM.render(<App />, document.getElementById('root'));
