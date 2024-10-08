import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import botImg from '../assets/bot.jpg';
import { useSignupUserMutation } from '../services/appApi';


function Signup() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signupUser, { error }] = useSignupUserMutation();
    const navigate = useNavigate();

    // IMAGE UPLOAD STATE
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 10485760) {
            return alert("Max file size is 10mb!");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "muas8aeh");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dx8lzqbyu/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }
    
    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        //SIGNUP THE USER
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate('/chat');
            }
        });
    }

  return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h1 className="text-center">Create account</h1>
                            <div className="signup-profile-pic__container">
                                <img src={imagePreview || botImg} alt='' className="signup-profile-pic" />
                                <label htmlFor="image-upload" className="image-upload-label">
                                    <i className="fas fa-plus-circle add-picture-icon"></i>
                                </label>
                                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                            </div>
                            {error && <p className='alert alert-danger'>{error.data}</p>}
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        {uploadingImg ? "Signing up..." : "Signup"}
                    </Button>
                    <div className="py-4">
                            <p className="text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    )
}

export default Signup