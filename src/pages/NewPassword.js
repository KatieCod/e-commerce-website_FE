import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";

function NewPassword(props) {

    const [formData, setFormData] = useState({ password: '', password2: '' })
    const [matching, setMatching] = useState('')
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
        if (formData.password === formData.password2) {
            axios.post(`http://localhost:3100/users/resest-password/${props.urlData.id}/${props.urlData.token}`, formData)
                .then(result => {
                    if (!result.data.failure) {
                        navigate('/reset_success')
                    } else {
                        setServerResponse(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            setMatching('the passwords do not match')
        }
    }

    return (
        <>
            <Container className="w-50">
                <Form className="mt-4">
                    <h1 className="text-center mt-5 mb-5">Create new password</h1>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Password"
                            defaultValue={formData.password}
                            onBlur={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="password2"
                            name="password2"
                            placeholder="Confirm Password"
                            defaultValue={formData.password2}
                            onBlur={handleChange}
                        />
                    </Form.Group>
                    <Container className="d-flex justify-content-center">
                        <Link to='/reset_success'>
                            <Button type="submit" className="mt-3 mb-5 btn btn-secondary" onClick={validateAndProceed}>save new password</Button>
                        </Link>
                    </Container>
                    <Form.Text>{matching}</Form.Text>
                    <Row className="justify-content-center">
                        <Col className="text-center">{serverResponse}</Col>
                    </Row>
                 
                </Form>
            </Container>
        </>
    )
}

export default NewPassword;