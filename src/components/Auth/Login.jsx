import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Constants from '../../app.config';
import Errors from "../GeneralComponents/Errors";

//TODO handle http errors
//TODO move form into component

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                valid: true,
                touched: false
            },
            password: {
                value: '',
                valid: true,
                touched: false
            },
            submitAttempted: false,
            errors: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    checkValidity (name, value) {
        switch (name) {
            case "password":
                return value.length > 6;
            case "email":
                return value.match(Constants.validation.email);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const valid = this.checkValidity(name, value);

        this.setState({
            [name]: {
                value: value,
                valid: valid,
                touched: true
            },
            submitAttempted: false
        });
    }

    submitForm(event) {
        event.preventDefault();
        this.setState({
            submitAttempted: true
        });

        let formIsValid = true;
        Object.keys(this.state).forEach(field => {
            let prop = this.state[field];
            if ((typeof prop.valid !== "undefined" && !prop.valid) || (typeof prop.touched !== "undefined" && !prop.touched)){
                formIsValid = false;
            }
        });
        if(formIsValid) {
            axios.post(Constants.baseUrl + 'api/login', {email: this.state.email.value, password: this.state.password.value}
            ).then(response => {
                console.log(response);
                this.setState({
                    errors: []
                })
            }, error => {
                this.setState({
                    errors: error.response.data.errors || []
                });
            });
        }
    }

    render () {
        return (
            <div>
                <div className="auth-form clearfix">
                    <form>
                        {
                            this.state.submitAttempted ? <Errors errors={this.state.errors}/> : null
                        }
                        <div className="spacer-bottom">
                            {
                                (!this.state.email.valid || ! this.state.email.touched) && this.state.submitAttempted &&
                                    <span className="text-danger">Please provide a valid email</span>
                            }
                            <input className="form-control" name="email" type="email" placeholder="Email" onChange={this.handleInputChange} />
                        </div>

                        <div className="spacer-bottom">
                            {
                                (!this.state.password.valid || ! this.state.password.touched) && this.state.submitAttempted &&
                                <span className="text-danger">Please provide a valid password</span>
                            }
                            <input className="form-control" name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </div>

                        <button className="btn btn-block btn-primary" onClick={this.submitForm}>Continue</button>

                        <p className="text-center"> or </p>

                        <button className="btn btn-block btn-success">
                            <span>
                            <img src="img/twitter-icon.png" className="btn-icon"/>
                            </span>
                            <span className="text-center"> Continue with Twitter </span>
                        </button>
                    </form>
                </div>


                <p className="text-center register-link"><Link to="/auth/register">Don't have a user? Register instead</Link></p>
            </div>
        );
    }
}

export default Login;