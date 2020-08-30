import React from 'react';

import { Menu, Icon } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <Menu size="large" inverted secondary pointing>
      <Menu.Item header>
        <Icon name="clipboard list" />
        Todos
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="Home" active onClick={() => console.log('Home')} />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
