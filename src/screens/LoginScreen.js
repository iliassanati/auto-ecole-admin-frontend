import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Heading from '../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { useNavigate } from 'react-router';
import { loginUser } from '../actions/userActions';
import Footer from '../components/Footer';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(cin, password));
  };

  return (
    <>
      <Heading title={`Authentification`} />
      <Row>
        <div className='landing-inner mb-4 mt-5'>
          <FormContainer>
            <h3 className='mb-4 mt-4'>
              <strong> Connectez-vous a votre espace </strong>
            </h3>
            <Form onSubmit={submitHandler}>
              {message && <Message variant='danger'>{message}</Message>}
              {errorLogin && (
                <Message variant={'danger'}>
                  <i className='fas fa-exclamation-triangle'></i> {errorLogin}
                </Message>
              )}
              <>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>
                    <i className='fas fa-user-circle '></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Num CIN'
                    style={{ borderRadius: '0' }}
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                  ></Form.Control>
                </InputGroup>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>
                    <i className='fas fa-lock '></i>
                  </InputGroup.Text>

                  <Form.Control
                    type='password'
                    placeholder='Mot de passe'
                    style={{ borderRadius: '0' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </InputGroup>

                {loadingLogin && <Spinner size={150} />}
                <div className='d-grid gap-2'>
                  <Button type='submit' variant='btn btn-outline-warning mb-4'>
                    <i className='fas fa-sign-in-alt fa-lg'></i> Envoyer
                  </Button>
                </div>
              </>
            </Form>
          </FormContainer>
        </div>
      </Row>
      <Footer />
    </>
  );
};

export default LoginScreen;
