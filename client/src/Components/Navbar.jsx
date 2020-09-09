import React from 'react';

import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

import '../css/Navbar.css';

const Navbar = ({ auth = false }) => {
  const history = useHistory();

  const path = window.location.pathname;

  const { logout, user } = useAuthStore();

  return (
    <Container as="nav">
      <Menu inverted secondary pointing>
        <Menu.Item
          name="todos"
          active={path === '/'}
          onClick={() => history.push('')}
        />
        <Menu.Item
          active={path === '/add'}
          disabled={!auth}
          name="add todo"
          onClick={() => history.push('/add')}
        />
        <Menu.Menu id="right-menu" position="right">
          {auth && user && (
            <Menu.Item id="user">
              <Icon name="user circle" />
              {user.name.split(' ')[0]}
            </Menu.Item>
          )}
          <Menu.Item>
            {auth ? (
              <Button icon inverted onClick={logout}>
                <Icon name="sign out" />
                <span id="button-text">Sign Out</span>
              </Button>
            ) : (
              <Button inverted as={Link} to="/login">
                Sign In
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Navbar;
