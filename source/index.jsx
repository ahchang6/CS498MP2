import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Search from './components/Search/Search.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Pokedex from './components/Pokedex/Pokedex.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/search" component={Search}/>
            <Route path="/gallery" component={Gallery}/>
            <Route path="/pokemon/:id" component={Pokedex}/>
        </div>
    </Router>,
    // Define your router and replace <Home /> with it!
    document.getElementById('app')
);
