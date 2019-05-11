import React, { useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as actions from './store/action/index';
const App = props => {
  useEffect(()=>{
    props.onTryAutoSignup();
  }, []) 
    let routes = (
      <Switch>
        <Route path='/auth' render={(props)=> <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' render={(props)=> <Checkout {...props}/>} />
          <Route path='/orders' render={(props)=> <Orders/>}  {...props}/>
          <Route path='/logout' render={(props)=> <Logout/>}  {...props}/>
          <Route path='/auth' render={(props)=> <Auth {...props}/>} />
          <Route path='/' exact component={BurgerBuilder} />
           <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className='App'>
        <Layout>{routes}</Layout>
      </div>
    );
  }

const mapStatetoProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(
  connect(
    mapStatetoProps,
    mapDispatchtoProps,
  )(App),
);
