/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { sendData } from '~/store/modules/log/actions';

// Biblioteca para controle de area de transferência use-clippy
import Modal from '~/easy-components/Modal';
import Switch from '~/easy-components/Switch';
import EasyIcon from '~/easy-components/Icon';

import { Container, Content, Menus, Item, ItemIcon } from './styles';

import MenuMobile from './Mobile';

function MenuButton({
  menus,
  icon: Icon,
  color,
  position,
  size,
  onOpen,
  settings,
  children,
  onBeforeShow = async () => {},
}) {
  const dispatch = useDispatch();

  const showLog = useSelector(({ log }) => log.isShow);

  const [isOpen, setOpen] = useState(false);
  const [isOpenMobile, setOpenMobile] = useState(false);
  const [clipboard, setClipboard] = useState();

  function onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  }

  const setTextToClipboard = async text => {
    await navigator.clipboard.writeText(text);
  };

  const handlerOpen = useCallback(
    async e => {
      e.stopPropagation();
      e.preventDefault();

      await onBeforeShow(menus);

      let text = '';

      // TODO: Clipboard not work firefox

      if (navigator.clipboard.readText)
        text = await navigator.clipboard.readText();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      if (onOpen) {
        onOpen({ menuList: menus, clipboard: text, setTextToClipboard });
      }

      setClipboard(text);
      setOpen(true);
    },
    [menus, onBeforeShow, onOpen]
  );

  return (
    <Container
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Switch
        mobile={
          <>
            <Content
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setOpenMobile(true);
              }}
            >
              {children || <Icon size={size} color={color} />}{' '}
            </Content>{' '}
            <Modal isOpened={isOpenMobile} direction="right">
              <MenuMobile
                menus={menus}
                onClose={() => setOpenMobile(false)}
                settings={settings}
              />
            </Modal>
          </>
        }
        computer={
          <Popup
            trigger={
              <Content onClick={onClick}>
                {' '}
                {children || <Icon size={size} color={color} />}{' '}
              </Content>
            }
            open={isOpen}
            position={position}
            onOpen={handlerOpen}
            onClose={e => {
              if (e) {
                e.stopPropagation();
                e.preventDefault();
              }
              setOpen(false);
            }}
          >
            <Menus>
              {menus.map(menu => {
                let disabled =
                  menu.disabled === undefined ? false : menu.disabled;
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
                  <Item
                    key={menu.text}
                    disabled={disabled}
                    visible={visibled}
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      setOpen(false);
                      if (!menu.disabled) {
                        menu.handler(e, { clipboard, setTextToClipboard });
                      }
                    }}
                    onMouseEnter={() => {
                      if (showLog)
                        dispatch(sendData({ name: menu.id, value: menu.text }));
                    }}
                  >
                    {menu.icon && (
                      <ItemIcon>
                        <EasyIcon
                          name={menu.icon}
                          size={18}
                          color={menu.color || '#555'}
                        />
                      </ItemIcon>
                    )}
                    <div> {menu.text} </div>
                  </Item>
                );
              })}
            </Menus>
          </Popup>
        }
      />
    </Container>
  );
}

MenuButton.propTypes = {
  icon: PropTypes.func.isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      handler: PropTypes.func,
    })
  ).isRequired,
  position: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  onOpen: PropTypes.func,
};

MenuButton.defaultProps = {
  position: 'left center',
  color: '#333',
  size: 18,
  onOpen: null,
};

export default MenuButton;

/*

                                                    <Popup trigger={<Container>...</Container>} position="right center">
                                                      <div>Popup content here !!</div>
                                                    </Popup>
                                                https://react-popup.elazizi.com/getting-started/
                                                */
