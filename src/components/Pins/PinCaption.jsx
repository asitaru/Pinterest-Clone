import React, {Component} from 'react';

class PinCaption extends Component {


    render () {
        const pin = this.props.pin;
        return (
            <div className="caption text-center">
                <h3 className="text-center">{pin.title}</h3>
                <p>{pin.description}</p>
            </div>
        );
    }
}

export default PinCaption;