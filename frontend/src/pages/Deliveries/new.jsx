import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import DeliveriesForms from './forms';

import { Row, Wrapper } from './styles';
import { MdArrowBack, MdOutlineDone } from 'react-icons/md';
import { ReactComponent as Spinner } from '../../assets/svgs/loader.svg';

/*
 *  Yup schema structure
 */

const schema = Yup.object().shape({
  client_name: Yup.string().required('Informe o nome do cliente'),
  delivery_date: Yup.string().required('Selecione a data da entrega'),
  starting_address: Yup.string().required('Informe o endereço de partida'),
  destiny_address: Yup.string().required('Informe o endereço de destino'),
});

function DeliveriesNew() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  async function handleSubmit({
    client_name,
    delivery_date,
    starting_address,
    destiny_address,
  }) {
    try {
      /*
       *  Remove all previous errors
       */

      formRef.current.setErrors({});

      /*
       *  Yup validation
       */

      await schema.validate(
        { client_name, delivery_date, starting_address, destiny_address },
        { abortEarly: false }
      );

      setLoading(true);

      await api.post('/deliveries', {
        client_name,
        delivery_date,
        starting_address,
        destiny_address,
      });

      setLoading(false);

      toast.success('Entrega criada com sucesso!');
      history.push('/deliveries');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        return formRef.current.setErrors(validationErrors);
      }

      setLoading(false);

      toast.error('Não foi possível cadastrar a encomenda');
      console.error(err);
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Row mb={30}>
        <h2>Nova entrega</h2>
        <Wrapper flex>
          <Link to="/deliveries" className="button grey">
            <MdArrowBack size={20} />
            <span>Voltar</span>
          </Link>
          <button type="submit" className="button">
            {loading ? (
              <>
                <Spinner />
                <span>Carregando</span>
              </>
            ) : (
              <>
                <MdOutlineDone size={20} />
                <span>Salvar</span>
              </>
            )}
          </button>
        </Wrapper>
      </Row>
      <div className="card">
        <DeliveriesForms />
      </div>
    </Form>
  );
}

export default DeliveriesNew;
