import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from '../Modal';

import api from '../../services/api';

import { MdMoreHoriz, MdEdit, MdDelete, MdCancel } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { HiEmojiSad } from 'react-icons/hi';
import { Container, DropBox, DeleteWarning, Content } from './styles';

function List({ headers, data, viewContent: ViewContent }) {
  const [active, setActive] = useState();
  const dropDownRef = useRef(new Array(data.length));

  /*
   *  Options behavior
   */

  const handleClickOutside = useCallback(
    (e) => {
      if (
        dropDownRef.current[active] &&
        !dropDownRef.current[active].contains(e.target)
      ) {
        return setActive(null);
      }
    },
    [active]
  );

  /*
   *  useEffect listener for dropDown
   */

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.values(headers).map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((registry, index) => (
              <tr key={registry + index}>
                {Object.keys(headers).map((column, index) => (
                  <td key={column + index} data-label={headers[column]}>
                    {registry[column]}
                  </td>
                ))}
                <td data-label="Ações">
                  <button
                    title="Ações"
                    onClick={() => {
                      setActive(index);
                    }}
                  >
                    <MdMoreHoriz size={22} />
                    <DropBox
                      ref={(el) => (dropDownRef.current[index] = el)}
                      active={active === index ? true : false}
                    >
                      <li key={index}>
                        <button
                          onClick={() =>
                            Modal.show({
                              title: `Dados de ${registry.name}`,
                              content: <ViewContent data={registry.raw} />,
                            })
                          }
                        >
                          <AiFillEye className="view" /> Visualizar
                        </button>
                      </li>
                    </DropBox>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Content>
          <span className="badge purple">
            Nenhum resultado encontrado <HiEmojiSad size={16} />
          </span>
        </Content>
      )}
    </Container>
  );
}

export default List;
