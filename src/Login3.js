import React, { Component } from "react";
import Validator, { field } from "./Validations";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { Link, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: field({ name: 'email', value: '', minLength: 4 }), //pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            password: field({ name: 'password', value: '', minLength: 4 }),
            user: [],
            success: false
        };
    }

    handleChange = (theUser) => {
        this.setState({ user: [theUser] });
    }

    onChange = ({ target: { name: fieldName, value } }) => {
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

        for (let key in user) {
            const { value, validations } = user[key];
            const errors = Validator(value, key, validations);
            if (errors.length) {
                user[key].errors = errors;
            }
        }

        if (!user.email.errors[0] && !user.password.errors[0]) {
            axios.post('http://localhost:3100/users/login', { email: user.email.value, password: user.password.value })
                .then(result => {
                    if (!result.data.failure) {
                        this.handleChange(result.data)
                        console.log(`Hurrraaaay! ${JSON.stringify(result.data)}`)
                    } else {
                        this.setState({ success: true })
                        Navigate('/homepage')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <Container className="w-50">
                <Form className="mt-4">
                    <h1 className="text-center">Login</h1>
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
                    <Container className="d-flex justify-content-center">
                        <Button type="submit" className="mt-3 mb-5 btn btn-secondary" onClick={this.getSubmit}>Log in</Button>
                    </Container>
                </Form>
            </Container>
        )
    }
}