import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import { Container } from './styles';
import { MdOutlineLogout } from 'react-icons/md';

function Header({ url }) {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <h3>{profile.name}</h3>
      <button onClick={handleLogout}>
        Fazer Logout <MdOutlineLogout />
      </button>
    </Container>
  );
}

export default Header;
