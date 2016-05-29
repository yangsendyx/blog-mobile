
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducers from './reducer';

import App from './component/app';
import Blog from './component/blog';
import Demo from './component/demo';
import Msg from './component/msg';
import About from './component/about';
import Note from './component/note';

reducers.routing = routerReducer;
const store = createStore( combineReducers(reducers) );
const history = syncHistoryWithStore(hashHistory, store);

/*let unsubscribe = store.subscribe(() => {
	let a = store.getState();
	console.log( a );
});*/

let div = document.createElement('div');
document.body.appendChild( div );

render(
	<Provider store={ store }>
		<Router history={ history }>
			<Route path="/" component={ App }>
	            <IndexRoute component={ Blog }></IndexRoute>
	            <Route path="blog" component={ Blog } ></Route>
	            <Route path="blog/:id" component={ Note } ></Route>
	            <Route path="demo" component={ Demo } ></Route>
	            <Route path="msg" component={ Msg } ></Route>
	            <Route path="about" component={ About } ></Route>
	        </Route>
		</Router>
	</Provider>,
	div
);