import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";

function ResetPassword(props) {

    const [formData, setFormData] = useState({ email: '' })
    const [link, setLink] = useState('')
    const [serverResponse, setServerResponse] = useState('')
    // const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        let userEmail = e.target.value;
        setFormData({ email: userEmail })
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3100/users/forgot-password', formData)
            .then(result => {
                if (!result.data.failure) {
                    setLink(result.data.link)
                    props.handleUrlData(result.data)
                } else {
                    setServerResponse(result.data.failure)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container className="w-50">
                <Form className="mt-4">
                    <h1 className="text-center mt-5 mb-5">Reset your password</h1>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={formData.email}
                            onBlur={handleChange}
                        />
                    </Form.Group>
                    <Container className="d-flex justify-content-center">
                        <Button type="submit" className="mt-3 mb-5 btn btn-secondary" onClick={validateAndProceed}>RESET</Button>
                    </Container>
                </Form>
            </Container>

            {link.length > 0
                ?
                <Container className="d-flex justify-content-center">
                    <Card variant="success" className="text-center" style={{ width: '300px' }}>
                        <Card.Header>Click the link to reset password</Card.Header>
                        <Link to='/new_password'>
                            <Card.Title>click me!</Card.Title>
                        </Link>
                    </Card>
                </Container>
                :
                <Row className="justify-content-center">
                    <Col className="text-center">{serverResponse}</Col>
                </Row>
            }
        </>
    )
}

export default ResetPassword;