import React, {Component} from 'react';

class Errors extends Component {


    render () {
        const errors = this.props.errors;
        return (
            <div>
                {
                    errors.map((error, i) => {
                        return (
                            <div className="spacer-bottom" key={i}>
                                <span className="text-danger">{error}</span>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}

Errors.defaultProps = {
    errors: []
};

export default Errors;