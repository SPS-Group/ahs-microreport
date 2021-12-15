import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { MdMenu } from 'react-icons/all';

import { showMenu } from '~/store/modules/mainMenu/actions';

import { PageHeader, MainMenu } from './styles';

function HeaderPage({
  backgroundColor,
  borderColor,
  color,
  // eslint-disable-next-line react/prop-types
  children,
  hideMainMenu,
}) {
  const dispatch = useDispatch();
  function showMainMenu() {
    dispatch(showMenu(true));
  }
  return (
    <PageHeader
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
    >
      {isMobile && !hideMainMenu && (
        <MainMenu onClick={showMainMenu}>
          <MdMenu size={24} color="#FFF" />
        </MainMenu>
      )}
      {children}
    </PageHeader>
  );
}

HeaderPage.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  /* children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired, */
  hideMainMenu: PropTypes.bool,
};

HeaderPage.defaultProps = {
  backgroundColor: null,
  borderColor: null,
  color: null,
  hideMainMenu: false,
};

export default HeaderPage;
