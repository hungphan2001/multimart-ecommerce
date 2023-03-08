import React,{useState} from 'react';
import { Container,Row,Col,Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import '../styles/login.css'
const Signup = () => {
  const[username,setUsename]= useState('');
  const[email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [file,setFile]= useState(null);
  return <Helmet title="Signup">
    <section>
      <Container>
        <Row>
          <Col lg='6' className='m-auto text-center'>
            <h3 className="fw-bold mb-4"> Signup</h3>
            <Form className="auth__form">
            <FormGroup className='form__group'>
           <input type='text' placeholder='Enter your username'
           value={username} onChange={e=>setUsename(e.target.value)}></input>
            </FormGroup>
            <FormGroup className='form__group'>
           <input type='email' placeholder='Enter your email'
           value={email} onChange={e=>setEmail(e.target.value)}></input>
            </FormGroup>
            <FormGroup className='form__group'>
           <input type='password' placeholder='Enter your password'
           value={password} onChange={e=>setPassword(e.target.value)}></input>
            </FormGroup>

            <FormGroup className='form__group'>
           <input type='file'
            onChange={e=>setFile(e.target.value)}></input>
            </FormGroup>

            <button type='submit' className="buy__btn auth__btn">
              Create an account</button>
            <p>Already have an account?{""} 
            <Link to='/login'>Login</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
};

export default Signup