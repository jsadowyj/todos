import React from 'react';

import { Form, Button, Message, Transition } from 'semantic-ui-react';

const TodoForm = ({
  error: [showError, setShowError],
  content: [content, setContent],
  handleSubmit,
  buttonText,
  placeholder,
  label,
}) => {
  return (
    <Form id="add-todo" inverted size="huge">
      <Transition visible={showError} animation="fade" duration={500}>
        <Message
          size="mini"
          error
          header="Uh oh"
          content="Could not properly complete request. Please try again later"
          onDismiss={() => setShowError(false)}
        />
      </Transition>
      <Form.Input
        name="todo"
        label={label ? label : 'Add Todo'}
        placeholder={placeholder ? placeholder : 'Walk the dog'}
        value={content}
        onChange={(e, { value }) => setContent(value)}
      />
      <Button
        onClick={handleSubmit}
        disabled={content.length === 0}
        primary
        fluid
        size="large"
      >
        {buttonText}
      </Button>
    </Form>
  );
};

export default TodoForm;
