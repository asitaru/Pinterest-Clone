import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Navbar/Navbar.jsx';
import Home from './Home/Home.jsx';
import UserPins from './UserPins/UserPins.jsx';
import Recent from './Recent/Recent.jsx';

class App extends Component {
    render () {
        return (
            <div>
                <Navbar />
                <div>
                    <Route exact path="/" component={Home}/>
                </div>
                <div>
                    <Route path="/my-pins" component={UserPins}/>
                </div>
                <div>
                    <Route path="/recent" component={Recent}/>
                </div>
            </div>
        )
    }
}

export default App;