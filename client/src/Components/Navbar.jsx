import React from 'react';

import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const path = window.location.pathname;
  return (
    <Container as="nav">
      <Menu inverted secondary pointing>
        <Menu.Item
          name="todos"
          active={path === '/'}
          onClick={() => console.log('Home')}
        />
        <Menu.Item
          active={path === '/add'}
          name="add todo"
          onClick={() => console.log('Add Todo')}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Button inverted as={Link} to="/login">
              Sign In
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Navbar;
