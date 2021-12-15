/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FaBars, FaRegBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import AuthenticationService from '~/services/AuthenticationService';
import { logoffSuccess } from '~/store/modules/authentication/actions';
import MenuButton from '../MenuButton';
import { Container, LeftPanel, RightPanel, Profile } from './styles';

export default function ShellBar({
  icon,
  title,
  username,
  information,
  isShowMenuButton,
  isShowSearchButton,
  isShowNotificationButton,
  onMenuClick,
  onLogoClick,
  backgroundColor,
}) {
  // document.title = title;

  const dispatch = useDispatch();

  async function onLogoff() {
    await AuthenticationService.logoff();
    dispatch(logoffSuccess());
  }

  return (
    <Container backgroundColor={backgroundColor}>
      <LeftPanel>
        {isShowMenuButton && (
          <FaBars color="#fff" size={18} onClick={onMenuClick} />
        )}
        <img src={icon} alt="logo" onClick={onLogoClick} />
        <h1>{title}</h1>
      </LeftPanel>
      <RightPanel>
        {isShowSearchButton && <FaSearch color="#fff" size={18} />}
        {isShowNotificationButton && <FaRegBell color="#fff" size={18} />}
        <Profile>
          <div>
            <h1>{username}</h1>
            <h2>{information}</h2>
          </div>
        </Profile>

        <MenuButton
          icon={FaUserCircle}
          size={24}
          position="bottom right"
          color="#fff"
          menus={[
            {
              visible: true,
              disabled: false,
              text: 'Sair',
              handler: () => onLogoff(),
            },
          ]}
        />
      </RightPanel>
    </Container>
  );
}

ShellBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  username: PropTypes.string,
  information: PropTypes.string,
  onMenuClick: PropTypes.func,
  isShowMenuButton: PropTypes.bool,
  isShowSearchButton: PropTypes.bool,
  isShowNotificationButton: PropTypes.bool,
  onLogoClick: PropTypes.func,
  backgroundColor: PropTypes.string,
};

ShellBar.defaultProps = {
  backgroundColor: '#354a5f',
  icon: null,
  username: null,
  information: null,
  isShowMenuButton: false,
  isShowSearchButton: false,
  isShowNotificationButton: false,
  onMenuClick: () => {},
  onLogoClick: () => {},
};
