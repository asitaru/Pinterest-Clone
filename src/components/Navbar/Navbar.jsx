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

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/my-pins">Your Pins </Link></li>
                            <li><Link to="/recent">Recent Pins</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;