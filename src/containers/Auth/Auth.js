import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/action/auth';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address',
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      modified: false,
      value: '',
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      modified: false,
      value: '',
    },
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const checkValidity = (value, rule) => {
    let isValid = true;
    if (rule.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }
    if (rule.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignedUp);
  };
  const switchAuthMode = e => {
    e.preventDefault();
    setIsSignedUp(!isSignedUp);
  };

  const formElArr = [];
  for (let key in controls) {
    formElArr.push({
      id: key,
      config: controls[key],
      // eltype + el config
    });
  }
  let form = formElArr.map(formEl => (
    <Input
      key={formEl.id}
      elementType={formEl.config.elementType}
      elementConfig={formEl.config.elementConfig}
      value={formEl.config.value}
      changed={event => inputChangedHandler(event, formEl.id)}
      invalid={!formEl.config.valid}
      touched={formEl.config.modified}
      shouldValidate={formEl.config.validation}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form>
        {form}
        <Button btnType='Success' clicked={submitHandler}>
          Submit
        </Button>
        <Button clicked={switchAuthMode} btnType='Danger'>
          Switch to {isSignedUp ? 'SignIn' : 'SignUp'}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) =>
      dispatch(actions.auth(email, password, isSignedUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
