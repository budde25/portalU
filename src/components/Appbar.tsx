import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import '../styles/Appbar.css';
import { Button, Typography } from '@material-ui/core';


type IProps = {
  onClick: any
  menu: string[]
};
type IState = {};

class DefaultAppBar extends Component<IProps, IState>{
  render() {
    const menu = this.props.menu;
    const listItems = menu.map((title: string) => this.renderMenuItem(title))

    return(
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {listItems}
          <div className='flex'></div>
          <IconButton edge="end" className='menuButton' color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    );
  }

  renderMenuItem(title: string) {
    return(
      <div className='title'>
        <Button
          color='inherit'
          aria-label={title}
          onClick={() => this.props.onClick(title)}>
            <Typography variant='h6'>
              {title}
            </Typography>
        </Button>
      </div>
    );
  }
}

export default DefaultAppBar;