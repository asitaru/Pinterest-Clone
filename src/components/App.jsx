import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Navbar/Navbar.jsx';
import Home from './Home/Home.jsx';
import UserPins from './UserPins/UserPins.jsx';
import Recent from './Recent/Recent.jsx';
import FullscreenPin from './Pins/FullscreenPin.jsx';

class App extends Component {
    render () {
        return (
            <div>
                <Navbar />
                <div className="full-container">
                    <Route exact path="/" component={Home}/>

                    <Route path="/my-pins" component={UserPins}/>

                    <Route path="/recent" component={Recent}/>

                    <Route path="/pin/:id" component={FullscreenPin} />
                </div>
            </div>
        )
    }
}

export default App;