import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import PinCaption from './PinCaption.jsx';

class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCaption: false
        }
    }

    onMouseEnter() {
        this.setState({showCaption: true});
    }

    onMouseLeave() {
        this.setState({showCaption: false});
    }

    render () {
        const pin = this.props.pin;
        return (
            <Link to={"/pin/" + pin._id}>
                <div className="thumbnail" style={{marginLeft: "30px"}} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
                    <img src={pin.url} />
                    {this.state.showCaption ? <PinCaption pin={pin}/> : null}
                </div>
            </Link>
        );
    }
}

export default Pin;