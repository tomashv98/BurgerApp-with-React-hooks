import React, { useState } from 'react';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

import { connect } from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler"
import * as actions from "../../../store/action/order"

const ContactData = props => {
 const[orderForm, setOrderForm] = useState ({
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {
          required: true,
        },
        valid: false,
        modified: false,
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        modified: false,
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        validation: {
          required: true,
        },
        valid: false,
        modified: false,
        value: '',
      },
      psc: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'PSC',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        modified: false,
        value: '',
      },
    })
    const [validForm, setValidForm]= useState(false)
  
  const orderHandler = e => {
    e.preventDefault();
    const orderData = {};
    for (let identifier in orderForm) {
      orderData[identifier] = orderForm[identifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.total,
      orderData,
      userId: props.userId
    };
    props.onOrder(order, props.token)
    
  };

  const inputchangeHandler = (e, input) => {
    const eventValue = e.target.value
    
      const updatedForm ={
        ...orderForm
      }
      const updatedElement = {
        ...updatedForm[input],
      };
      updatedElement.value = eventValue;
      updatedElement.valid = checkValidity(
        updatedElement.value,
        updatedElement.validation,
      );
      updatedElement.modified = true;
      updatedForm[input] = updatedElement;
      let formValid = true;
      for (let input in updatedForm) {
        formValid = updatedForm[input].valid && formValid;
      }
      setOrderForm(updatedForm) ;
    setValidForm(formValid)
    
  
  };

  const checkValidity = (value, rule) => {
    let isValid = true;
    if(!rule){
      return true
    }
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
      isValid = pattern.test(value) && isValid
  }

  if (rule.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }
    return isValid;
  };
  
    const formElArr = [];
    for (let key in orderForm) {
      formElArr.push({
        id: key,
        config: orderForm[key],
        // eltype + el config
      });
    }

    let form = (
      <form onSubmit={orderHandler}>
        {formElArr.map(el => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={event => inputchangeHandler(event, el.id)}
            invalid={!el.config.valid}
            touched={el.config.modified}
            shouldValidate={el.config.validation}
          />
        ))}
        <Button
          btnType='Success'
          clicked={orderHandler}
          disabled={!validForm}
        >
          Confirm
        </Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact</h4>
        {form}
      </div>
    );
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    total: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId

  };
};

const mapDispatchToProps = dispatch => {
  return{
    onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
