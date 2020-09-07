import React, { useState } from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import PasswordInput from './PasswordInput';
import '../css/SignIn.css';

const SignUp = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [showWarning, setShowWarning] = useState(false);

  const [serverMessage, setServerMessage] = useState(null);

  const defaultFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { firstName, lastName, email, password } = formData;

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (password.length < 6) {
      return setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    setLoading(true);
    const asyncRequest = async () => {
      try {
        await axios.post('/api/register', {
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
        });
        console.log('Login successful');
        setLoading(false);
        setFormData(defaultFormData);
        history.push('/login?success=true');
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

    // console.log(formData);
    // setFormData(defaultFormData);
  };

  return (
    <div>
      <Container id="sign-up">
        <div className="ui center aligned header">
          <Header inverted as="h1">
            Sign Up
          </Header>
        </div>
        <Form
          inverted
          onSubmit={handleSubmit}
          warning={showWarning}
          error={serverMessage ? true : false} // I swear this isn't retarded
        >
          <Message
            error
            header={serverMessage ? serverMessage.header : 'Error'}
            content={
              serverMessage ? serverMessage.content : 'An error has occured'
            }
          />
          <Form.Input
            required
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={handleChange}
          />
          <Form.Input
            required
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={handleChange}
          />

          <Form.Input
            required
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={handleChange}
          />
          <PasswordInput onChange={handleChange} value={password} />
          <Message
            warning
            header="Password Length"
            content="Please make sure your password is at least 6 characters"
          />

          <Form.Field className="signup-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </Form.Field>
          <Button loading={loading} type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignUp;
