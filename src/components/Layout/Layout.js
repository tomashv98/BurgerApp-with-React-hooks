import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';

import classes from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSide, setShowSide] = useState(false);

  const closeSideDrawer = () => {
    setShowSide(false);
  };
  const drawerToggleClick = () => {
    setShowSide(!showSide);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuth} drawerToggleClick={drawerToggleClick} />
      <SideDrawer
        isAuth={props.isAuth}
        show={showSide}
        closed={closeSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
