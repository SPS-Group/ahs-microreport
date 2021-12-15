import React from 'react';
import { GoArrowRight } from 'react-icons/go';

// eslint-disable-next-line react/prop-types
export default function LinkIcon({ onClick }) {
  return (
    <GoArrowRight
      onClick={onClick}
      size={22}
      color="rgb(255, 189, 39)"
      style={{ cursor: 'pointer' }}
    />
  );
}
