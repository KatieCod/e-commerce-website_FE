import React, { Component } from "react";
import Validator, { field } from "./Validations";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from "axios";

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: field({ name: 'firstname', value: '', isRequired: true, minLength: 2 }),
            lastname: field({ name: 'lastname', value: '', isisRequired: true, minLength: 2 }),
            email: field({ name: 'email', value: '', isRequired: true }), // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            phone: field({ name: 'phone', value: '', isRequired: false }), //pattern: /^(\()?[2-9]{1}\d{2}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/ 
            password: field({ name: 'password', value: '', isRequired: true, minLength: 4, minNumbers: 1, minLowercase: 1, minUppercase: 1 }),
            repeatPassword: field({ name: 'password', value: '', isRequired: true })
        };
    }

    onChange = ({target: {name: fieldName, value}}) => {
        const errors = Validator(fieldName, value, this.state[fieldName].validations);

        this.setState({
            [fieldName]: {
                ...this.state[fieldName],
                value,
                errors
            }
        });
    }

    getSubmit = e => {
        e.preventDefault();

        const user = Object.assign({}, this.state);

        for(let key in user) {
            const { value, validations } = user[key];
            const errors = Validator(value, key, validations);
            if(errors.length) {
                user[key].errors = errors;
            }
        }

        if(!user.email.errors[0] && !user.password.errors[0]) {
            axios.post('http://localhost:3100/users/register', {email: user.email.value, password: user.password.value, 
            first_name: user.firstname.value, last_name: user.lastname.value })
            .then(result => {
                if(!result.data.failure){
                    // this.handleChange(result.data)
                    console.log(`Hurrraaaay! ${JSON.stringify(result.data)}`)
                } else {
                    console.log(result.data)
                }
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <Container className="w-50">
                <Form className="mt-4" >
                    <h1 className="text-center">Registration</h1>
                    <Form.Group className="mt-5">
                        <Form.Control
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="First Name"
                            defaultValue={this.state.firstname.value}
                            onBlur={this.onChange}
                        />
                        {this.state.firstname.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            defaultValue={this.state.lastname.value}
                            onBlur={this.onChange}
                        />
                        {this.state.lastname.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={this.state.email.value}
                            onBlur={this.onChange}
                        />
                        {this.state.email.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="phone"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            defaultValue={this.state.phone.value}
                            onBlur={this.onChange}
                        />
                        {this.state.phone.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Password"
                            defaultValue={this.state.password.value}
                            onBlur={this.onChange}
                        />
                        {this.state.password.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="repeatPassword"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            defaultValue={this.state.repeatPassword.value}
                            onBlur={this.onChange}
                        />
                        {this.state.repeatPassword.errors.map((error, index) => (
                            <Form.Text key={index} className="text-danger">{error}</Form.Text>
                        ))}
                    </Form.Group>
                    <Container className="d-flex justify-content-center">
                        <Button type="submit" className="mt-3 btn btn-secondary" onClick={this.getSubmit}>Register</Button>
                    </Container>
                </Form>
            </Container>
        )
    }
}