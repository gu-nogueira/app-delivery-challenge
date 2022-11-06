import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Loader from '../../components/Loader';
import Maps from '../../components/Maps';

import api from '../../services/api';
import history from '../../services/history';

import DeliveriesForms from './forms';

import { Row } from './styles';
import { MdArrowBack, MdOutlineDone } from 'react-icons/md';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function DeliveriesView({ delivery }) {
  const routes = {
    starting_address: delivery.starting_address,
    destiny_address: delivery.destiny_address,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <Loader />;
  }

  return <Maps routes={routes} />;
}

export default DeliveriesView;
