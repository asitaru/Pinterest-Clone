import React, {Component} from 'react';
import axios from 'axios';

class FullscreenPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: {}
        }
    }

    componentWillMount() {
        axios.post("https://react-pinterest.herokuapp.com/graphql", {
            query: `{pin(_id: "${this.props.match.params.id}") {_id, title, url }}`
        }).then( response => {
            this.setState({pin: response.data.data.pin});
            console.log(response.data.data.pin);
        }, error => {
            console.log(error);
        });
    }

    render () {
        return (
            <div>
                <div className="back-button">
                    <button className="btn btn-default" onClick={this.props.history.goBack}>
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span>Back</span>
                    </button>
                </div>
            <div className="container">
                <div className="pin-container">
                    <div className="pin-container-actions">
                        <button className="btn btn-default">Share</button>
                        <button className="btn btn-primary pull-right">Save</button>
                    </div>
                    <div className="img-container">
                        <h3 className="text-center">{this.state.pin.title}</h3>
                        <img src={this.state.pin.url} />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default FullscreenPin;