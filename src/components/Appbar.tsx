import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Appbar.css';


type IProps = {
  menu: string[]
};
type IState = {};

class AppBar extends Component<IProps, IState>{
  render() {
    const menu = this.props.menu;
    const listItems = menu.map((title: string) => this.renderItem(title))
    const home: string = '/' + menu[0].toLowerCase()

    return(
      <div className="Appbar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link className='text-link' to={home}>Portal-App</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {listItems}
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item >
                  <Link className='text-link'  to='/settings'>Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link className='text-link' to='/admin-settings'>Admin Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

  renderItem(title: string) {
    const link: string = '/' + title.toLowerCase()
    return(
      <Nav.Link>
        <Link className='text-link' to={link}>{title}</Link>
      </Nav.Link>
    );
  }
}

export default AppBar;