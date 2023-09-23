// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux';
// import { PersistGate} from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";
// import store from './store';

// const persistedStore = persistStore(store);

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistedStore}>
//                 <App />
//             </PersistGate>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from './store';

const persistedStore = persistStore(store);

// Use createRoot to create a root container
const root = createRoot(document.getElementById('root'));

// Use root.render to render your app inside the root container
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
