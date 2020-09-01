import React from 'react';
import { Container, Form, Button, Checkbox } from 'semantic-ui-react';

const SignIn = () => {
  return (
    <div>
      <Container>
        <Form inverted>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignIn;
