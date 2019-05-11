import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/action/index';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(()=>{
    props.onInitIngs()
  }, []);

  const updatePurchaseState = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients)
      .map(igKey => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if(props.isAuth){
      setPurchasing(true)

    }else{
      props.onSetRedirectPath ("/checkout")
      props.history.push("/auth")
    }

  };
  const cancelHandler = () => {
    setPurchasing(false)
  };
  const continueHandler = () => {
    props.history.push('checkout');
    props.onInitPurchase()
  };

 
    const disableButton = { ...props.ings };
    for (let key in disableButton) {
      disableButton[key] = disableButton[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            addIngredient={props.onAddIng}
            removeIngredient={props.onRemoveIng}
            disabled={disableButton}
            price={props.total}
            purchasable={updatePurchaseState(props.ings)}
            order={purchaseHandler}
            isAuth={props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          continue={continueHandler}
          cancel={cancelHandler}
          ingredients={props.ings}
          price={props.total.toFixed(2)}
        />
      );
    }

    return (
      <Aux>
        <Modal show={purchasing} closed={cancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    total: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIng: ingName => dispatch(actions.addIng(ingName)),
    onRemoveIng: ingName => dispatch(actions.removeIng(ingName)),
    onInitIngs: () => dispatch(actions.initIngs()),
    onInitPurchase: ()=>dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
