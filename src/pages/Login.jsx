import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/appApi';
import Button from 'react-bootstrap/Button';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';


function Login() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    function handleLogin(e) {
        e.preventDefault();
        // LOGIN LOGIC
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                //WORKING SOCKET
                socket.emit("new-user");
                //NAVIGATE TO THE CHAT
                navigate('/chat');
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
                    
                    <Form.Text className="text-muted">
                        <h2>ConnectiChat</h2>
                        <h3>Connects you with people</h3>
                    </Form.Text>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {error && <p className='alert alert-danger'>Invalid Credential/s</p>}
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        {isLoading ? <Spinner animation='grow' /> : 'Login'}
                    </Button>
                    <div className="py-4">
                            <p className="text-center">
                                Don't have an account ? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;