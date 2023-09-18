import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginHook(props) {

    const [saveData, setSaveData] = useState({})
    const [saveErrors, setSaveErrors] = useState({})
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const validateAndProceed = (e) => {
        e.preventDefault();

        if (Object.keys(saveErrors).length === 0) {
            axios.post('http://localhost:3100/users/login', saveData)
                .then(result => {
                    if (!result.data.failure) {
                        props.handleAuthorization(false)
                        props.handleAuthorization(true)
                        navigate('/homepage')
                        window.location.reload(true);
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Container className='text-center'>
            <h1 className="mt-5">Log in</h1>
            <Formik
                initialValues={{email: '', password: ''}}
                validate={values => {
                    const errors = {};
                    setSaveErrors({});
                    setSaveData({email: values.email, password: values.password})

                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address'
                    }

                    if (!values.password) {
                        errors.password = 'Password is required'
                    } else if (values.password.length < 4) {
                        errors.password = 'Password should be at least 4 charecters long'
                    }
                    setSaveErrors(errors)
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400)
                }}
            >
                {({ isSubmitting }) => (
                    <div className='text-center'>
                        <Form className="mt-4">
                            <div className="mt-3" class='input-box ' >
                                <Field className="mt-3" type='email' name='email' placeholder='Enter email'/>
                                <ErrorMessage class="error" name="email" component="div" />
                            </div>
                            <div class='input-box'>
                                <Field className="mt-3" type='password' name='password' placeholder='Enter password'/>
                                <ErrorMessage class="error" name="password" component="div" />
                            </div>
                            <Container className="text-center mt-3">
                                <Link to='/reset_password'><p>Forgot your password?</p></Link>
                            </Container>
                            <Button onClick={validateAndProceed} className="mt-2" type="submit" disabled={isSubmitting}>
                                Log In
                            </Button>
                        </Form>
                    </div>
                )}
            </Formik>
        </Container>
    )
}

export default LoginHook;