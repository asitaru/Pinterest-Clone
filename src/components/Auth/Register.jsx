import React, {Component} from 'react';
import axios from "axios/index";

import Constants from '../../app.config';
import Errors from "../GeneralComponents/Errors";
//TODO move forms to dedicated component

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                valid: true,
                touched: false
            },
            name: {
                value: '',
                valid: true,
                touched: false
            },
            password: {
                value: '',
                valid: true,
                touched: false
            },
            password2: {
                value: '',
                valid: true,
                touched: false
            },
            submitAttempted: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    checkValidity (name, value) {
        switch (name) {
            case "password":
            case "password2":
                return value.length > 6;
            case "email":
                return value.match(Constants.validation.email);
            case "name":
                return value.match(Constants.validation.name);
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
            submitAttempted: false,
            errors: []
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
            const body = {
                email: this.state.email.value,
                name: this.state.name.value,
                password: this.state.password.value,
                password2: this.state.password2.value
            };
            axios.post(Constants.baseUrl + 'api/register', body
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
            <div className="auth-form clearfix">
                <form>
                    {
                        this.state.submitAttempted ? <Errors errors={this.state.errors}/> : null
                    }
                    <div className="spacer">
                        {
                            (!this.state.email.valid || ! this.state.email.touched) && this.state.submitAttempted &&
                            <span className="text-danger">Please provide a valid email</span>
                        }
                        <input className="form-control" type="email" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                    </div>

                    <div className="spacer">
                        {
                            (!this.state.name.valid || ! this.state.name.touched) && this.state.submitAttempted &&
                            <span className="text-danger">Please provide a valid name</span>
                        }
                        <input className="form-control" type="text" name="name" placeholder="Name" onChange={this.handleInputChange}/>
                    </div>

                    <div className="spacer">
                        {
                            (!this.state.password.valid || ! this.state.password.touched) && this.state.submitAttempted &&
                            <span className="text-danger">Please provide a valid password</span>
                        }
                        <input className="form-control" type="password" name="password" placeholder="Password"  onChange={this.handleInputChange}/>
                    </div>

                    <div className="spacer">
                        {
                            (!this.state.password2.valid || ! this.state.password2.touched) && this.state.submitAttempted &&
                            <span className="text-danger">Please provide a valid password</span>
                        }
                        {
                            (this.state.password2.value !== this.state.password.value) && this.state.submitAttempted &&
                            <span className="text-danger">Please provide matching passwords</span>
                        }
                        <input className="form-control" type="password" name="password2" placeholder="Confirm Password"
                               onChange={this.handleInputChange}/>
                    </div>

                    <button className="btn btn-block btn-success register-button" onClick={this.submitForm}>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;