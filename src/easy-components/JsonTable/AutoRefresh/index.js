import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import propTypes from 'prop-types';

// import { Container } from './styles';

function AutoRefresh({ value, onEnd }, ref) {
  const timerRef = useRef(null);
  const [timerDisplay, setTimerDisplay] = useState(0);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setTimerDisplay(parseInt(value / 1000, 10));
    },
  }));

  const startTimer = useCallback(() => {
    setTimerDisplay(parseInt(value / 1000, 10));
    timerRef.current = setInterval(() => {
      setTimerDisplay((oldTimerDisplay) => {
        if (oldTimerDisplay <= 0) {
          onEnd();
          return parseInt(value / 1000, 10);
        }

        return oldTimerDisplay - 1;
      });
    }, 1000);
  }, [onEnd, value]);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  return <p>Recarregando em {timerDisplay}</p>;
}

AutoRefresh.propTypes = {
  value: propTypes.number,
  onEnd: propTypes.func,
};

AutoRefresh.defaultProps = {
  value: 0,
  onEnd: () => {},
};

export default forwardRef(AutoRefresh);
