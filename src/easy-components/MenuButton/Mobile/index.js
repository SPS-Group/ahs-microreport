/* eslint-disable react/prop-types */
import React from 'react';

import Button from '~/easy-components/Button';
import Icon from '~/easy-components/Icon';

import { Container, ItemMobile, Content, Footer, Title } from './styles';

function Mobile({ menus, onClose, settings }) {
  return (
    <Container>
      <Content>
        {menus.map(menu => {
          let disabled = menu.disabled === undefined ? false : menu.disabled;
          let visibled = menu.visible === undefined ? true : menu.visible;

          if (settings) {
            if (settings.menus) {
              const menuSettings = settings.menus.find(
                mnu => mnu.name === menu.id
              );
              if (menuSettings) {
                disabled = menuSettings.disabled || disabled;

                if (menuSettings.hidden) visibled = false;
              }
            }
          }

          if (!visibled) return null;

          return (
            <ItemMobile
              key={menu.text}
              disabled={disabled}
              visible={visibled}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onClose(false);

                if (!menu.disabled) {
                  menu.handler(e);
                }
              }}
            >
              {menu.icon && (
                <Icon name={menu.icon} size={18} color={menu.color || '#555'} />
              )}
              <Title>{menu.text}</Title>
            </ItemMobile>
          );
        })}
      </Content>
      <Footer>
        <Button buttonType="Emphasized" type="button" onClick={() => onClose()}>
          Fechar
        </Button>
      </Footer>
    </Container>
  );
}

export default Mobile;
