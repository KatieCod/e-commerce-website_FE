import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function ResetSuccess() {
   
    return (
        <Container className="w-50">
            <Form className="mt-4">
                <h1 className="text-center mt-5 mb-5">Your password has been successfully reset!</h1>
                <Container className="d-flex justify-content-center">
                    <Link to='/login_page'><Button type="submit" className="mt-3 mb-5 btn btn-secondary" >LOGIN </Button></Link>
                </Container>
            </Form>
        </Container>
    )
}

export default ResetSuccess;