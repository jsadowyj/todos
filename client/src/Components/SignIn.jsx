import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Button,
  Message,
  Icon,
  Header,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import PasswordInput from './PasswordInput';
import '../css/SignIn.css';

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const defaultFormData = {
    email: '',
    password: '',
  };

  const [serverMessage, setServerMessage] = useState(null);

  const [formData, setFormData] = useState(defaultFormData);
  const { email, password } = formData;

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const { data } = await axios.post('/api/login', {
          email,
          password,
        });
        console.log('Login successful');
        console.log(data);
        localStorage.setItem('authToken', data.token);
        setLoading(false);
        setFormData(defaultFormData);
        history.push('');
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        setFormData(defaultFormData);
        setServerMessage({
          header: 'Error',
          content: err.response.data.errors[0].msg,
        });
      }
    };
    asyncRequest();
  };

  return (
    <div>
      <Container id="sign-in">
        <div className="ui center aligned header">
          <Header inverted as="h1">
            Sign In
          </Header>
        </div>
        <Form
          inverted
          onSubmit={handleSubmit}
          error={serverMessage ? true : false}
          success={props.location.search === '?success=true' && !serverMessage}
        >
          <Message
            success
            header="Sign Up Complete"
            content="Please log in with your new account"
          />
          <Message
            error
            header={serverMessage ? serverMessage.header : 'Error'}
            content={
              serverMessage ? serverMessage.content : 'An error has occured'
            }
          />
          <Form.Input
            required
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            onChange={handleChange}
            value={email}
          />
          <PasswordInput onChange={handleChange} value={password} />
          <Form.Field className="signup-text">
            Don't have an account? <Link to="signup">Sign Up</Link>
          </Form.Field>
          <Button loading={loading} type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignIn;
