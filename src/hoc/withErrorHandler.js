import React, { useEffect, useState } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInter = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInter = axios.interceptors.response.use(
      res => res,
      err => {
        setError(err);
      },
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInter);
        axios.interceptors.response.eject(resInter);
      };
    }, [reqInter, resInter]);

    const errorHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal closed={errorHandler} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
