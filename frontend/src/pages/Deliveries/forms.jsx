import React, { useState, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Loader from '../../components/Loader';
import Input from '../../components/Input';

import { Row, Wrapper } from './styles';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function DeliveriesForms() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <Wrapper stretch>
          <label htmlFor="client_name">Nome do cliente</label>
          <Input
            name="client_name"
            id="client_name"
            placeholder="ex: João da Silva"
          />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="delivery_date">Data de entrega</label>
          <Input
            name="delivery_date"
            id="delivery_date"
            placeholder="Selecione uma data"
            type="date"
          />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper stretch>
          <label htmlFor="starting_address">Ponto de partida</label>
          <Autocomplete>
            <Input name="starting_address" id="starting_address" />
          </Autocomplete>
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="destiny_address">Ponto de destino</label>
          <Autocomplete>
            <Input name="destiny_address" id="destiny_address" />
          </Autocomplete>
        </Wrapper>
      </Row>
    </>
  );
}

export default DeliveriesForms;
