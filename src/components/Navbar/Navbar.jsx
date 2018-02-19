import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {

    render () {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">React Pinterest</Link>
                    </div>

                    <form className="navbar-form navbar-left">
                        <span><i className="glyphicon glyphicon-search"/></span>
                        <input type="text" className="form-control" placeholder="Search" />
                    </form>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/my-pins">Your Pins </Link></li>
                            <li><Link to="/recent">Recent Pins</Link></li>
                        </ul>
                        <div className="navbar-right">
                            <ul className="nav navbar-nav">
                                <li><Link to="/auth/login">Login</Link></li>
                                <li>
                                    <a className="droppdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-option-horizontal"></i></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;