import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../validations/validationManager";
import axios from "axios";

function LoginPage(props) {
    const [formData, setFormData] = useState({ email: '', password: '', first_name: '' })
    const [errors, setErrors] = useState({})
    const [serverResponse, setServerResponse] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        const currentErrors = validateLogin(formData.email, formData.password)
        setErrors(currentErrors)
        setServerResponse(null)
        if (Object.keys(currentErrors).length > 0) {
            return 0
        } else {
            axios.post('http://localhost:3100/users/login', formData)
                .then(result => {
                    if (!result.data.failure) {
                        setFormData((prevData) => ({
                            ...prevData,
                            first_name: result.data.first_name
                        }))
                        props.handleAuthorization(false)
                        props.handleAuthorization(true)
                        navigate('/homepage')
                        window.location.reload(true);
                    } else {
                        setServerResponse(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        }
    }

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
                        defaultValue={formData.email}
                        isInvalid={errors.emailError}
                        onBlur={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Control
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        defaultValue={formData.password}
                        isInvalid={errors.passwordError}
                        onBlur={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.passwordError}
                    </Form.Control.Feedback>
                <Container className="text-center mt-3">
                    <Link to='/reset_password'><Form.Text>Forgot your password?</Form.Text></Link>
                </Container>
                </Form.Group>
                <Container className="d-flex justify-content-center">
                    <Button type="submit" className="mt-3 mb-5 btn btn-secondary" onClick={validateAndProceed}>Log in</Button>
                </Container>
                <Row className="justify-content-center">
                    <Col className="text-center">{serverResponse}</Col>
                </Row>
            </Form>
        </Container>
    )
}

export default LoginPage;