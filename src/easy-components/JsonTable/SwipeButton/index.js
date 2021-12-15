/* eslint-disable react/prop-types */
import React from 'react';

import Icon from '../../Icon';

import { Container } from './styles';

function SwipeButton({ settings, onClick }) {
  const { title, swipe } = settings;

  const { color, backgroundColor, direction, icon, iconColor } = swipe || {};

  return (
    <Container
      style={{
        backgroundColor,
        color,
      }}
      direction={direction}
      onClick={onClick}
    >
      {icon && <Icon color={iconColor || '#555'} name={icon} size={18} />}
      {title}
    </Container>
  );
}

export default SwipeButton;
