import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import DeliveriesView from './view';

import api from '../../services/api';

import Loader from '../../components/Loader';
import List from '../../components/List';
import Pagination from '../../components/Pagination';

import { MdOutlineAdd } from 'react-icons/md';
import { Row, Wrapper, Content } from './styles';

function formatDate(date) {
  if (!date) {
    return <span className="pending">Pendente</span>;
  }
  const isoDate = parseISO(date);
  return isoDate.toLocaleDateString('pt-BR');
}

function ViewContent({ data }) {
  if (data)
    return (
      <Content>
        <DeliveriesView delivery={data} />
      </Content>
    );
}

function Deliveries() {
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [deliveriesTotal, setDeliveriesTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const headers = {
    id: 'ID',
    client_name: 'Cliente',
    delivery_date: 'Data de entega',
    starting_address: 'Ponto de partida',
    destiny_address: 'Ponto de destino',
  };
  const options = ['view'];
  const apiRoute = '/deliveries';
  const params = {
    page: currentPage,
    perPage: 20,
  };

  async function fetchDeliveries() {
    setLoading(true);
    try {
      const response = await api.get(apiRoute, { params });
      const { rows, total } = response.data;
      setDeliveries(
        rows.map((delivery) => {
          delivery.raw = { ...delivery };
          delivery.id = `#${delivery.id.toString().padStart(2, 0)}`;
          delivery.name = `Entrega ${delivery.id}`;
          delivery.delivery_date = formatDate(delivery.delivery_date);
          delivery.starting_address = (
            <Wrapper text width="12vw">
              {delivery.starting_address}
            </Wrapper>
          );
          delivery.destiny_address = (
            <Wrapper text width="12vw">
              {delivery.destiny_address}
            </Wrapper>
          );
          return delivery;
        })
      );
      setDeliveriesTotal(total);
    } catch (err) {
      console.error(err);
      toast.error('Não foi possível carregar as entregas');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <Row>
        <h2>Listagem de entregas</h2>
        <Link className="button" to="/deliveries/new">
          <MdOutlineAdd size={20} />
          <span>Cadastrar</span>
        </Link>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <>
          <List
            category="deliveries"
            headers={headers}
            data={deliveries}
            options={options}
            apiRoute={apiRoute}
            fetchData={fetchDeliveries}
            viewContent={ViewContent}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={deliveriesTotal}
            perPage={params.perPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
}

export default Deliveries;
