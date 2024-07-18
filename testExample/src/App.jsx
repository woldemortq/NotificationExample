import React, { useState, useEffect, useRef } from 'react';
import icon_ok from './assets/images/icon_ok.png';
import not_ok from './assets/images/not_ok.png';
import Notificate from "./Notificate.jsx";
import Notification from "./progressEffect.jsx";

const simulateServer = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ status: "Успешно", label: icon_ok, text: "Данные успешно загружены" });
      } else {
        reject({ status: "Изменения не сохранены", label: not_ok, text: "Потеря интернет соединения" });
      }

    }, 1000);
  });
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [pause, setPause] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3000);
  const timerRef = useRef(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await simulateServer();
      setResult(response);
      setNotificationVisible(true);
      setRemainingTime(3000);
    } catch (error) {
      setError(error);
      setNotificationVisible(true);
      setRemainingTime(3000);
    }
    setLoading(false);
  };

  const handleMouseEnter = () => {
    setPause(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setPause(false);
  };

  useEffect(() => {
    if (notificationVisible && !pause) {
      timerRef.current = setTimeout(() => {
        setNotificationVisible(false);
      }, remainingTime);

      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => {
        clearTimeout(timerRef.current);
        clearInterval(interval);
      };
    }
  }, [notificationVisible, pause, remainingTime]);



  return (
    <>
      <button className="buttonStyle" onClick={handleClick} disabled={loading || pause}>
        {loading ? 'Отправка...' : 'Отправить'}
      </button>
      
      {notificationVisible && (result || error) && (
          <div
            onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Notificate
            status={result ? result.status : error.status}
            label={result ? result.label : error.label}
            text={result ? result.text : error.text}
          />
          <Notification/>
          </div>
      )}

    </>
  );
};

export default App;