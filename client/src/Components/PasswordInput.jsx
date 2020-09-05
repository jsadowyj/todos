import React, { useState } from 'react';

import { Form, Icon } from 'semantic-ui-react';

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Input
      required
      name="password"
      icon={
        <Icon
          name={showPassword ? 'eye slash' : 'eye'}
          link
          onClick={() => setShowPassword(!showPassword)}
        />
      }
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      value={value}
      onChange={onChange}
    />
  );
};

export default PasswordInput;
