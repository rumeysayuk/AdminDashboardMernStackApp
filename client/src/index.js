import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers"
import "./index.css"
import {ContextProvider} from "./contexts/ContextProvider";

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><ContextProvider><App tab="home"/>
</ContextProvider></Provider>);