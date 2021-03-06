import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/UserAction';

const LoginScreen = ({ location, history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;


    const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {
    //     if (userInfo) {
    //         history.push('/verify')
    //     }
    // }, [history, userInfo, redirect])



    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(login(username, password))

    }

    if (userInfo) {
        return <Redirect to="/verify" />
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
        }} >


            <FormContainer>
                <h1>Admin Login</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Username Address</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className="btn-block">
                        Login
        </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Admin ?{' '}
                        <Link to={'/register'}>
                            Register
          </Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen;