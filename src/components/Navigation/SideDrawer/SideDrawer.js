import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div style={{ height: '11%' }}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
                  isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
