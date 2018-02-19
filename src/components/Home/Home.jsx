import React, {Component} from 'react';
import axios from 'axios';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

import Pin from '../Pins/Pin.jsx';
import Constants from '../../app.config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pins: []
        }
    }

    componentWillMount() {
        axios.get(Constants.baseUrl + 'graphql?query={pins{_id,title,url}}'
        ).then( response => {
            this.setState({pins: response.data.data.pins});
            console.log(response.data.data.pins);
            }, error => {
            console.log(error);
            });
    }

    render () {
        return (
            <ResponsiveMasonry>
                <Masonry id="masonry-layout">
                    {this.state.pins.map(pin => {
                        return <Pin pin={pin} key={pin._id}/>;
                    })}
                </Masonry>
            </ResponsiveMasonry>
        );
    }
}

export default Home;