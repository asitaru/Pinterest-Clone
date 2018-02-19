import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Register from './Register.jsx';
import Login from './Login.jsx';

class Auth extends Component {

    render () {
        return (
            <div>
                <div className="container">
                    <div className="auth-container">
                        <div className="auth-box">
                            <div className="auth-box-logo">
                                <img src="img/icon.png" />
                            </div>
                            <h4 className="text-center"> Welcome to React Pinterest </h4>

                            <Route path="/auth/login" component={Login} />
                            <Route path="/auth/register" component={Register} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;