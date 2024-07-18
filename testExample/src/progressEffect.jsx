import React, { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    const progress = () => {
      let elem = document.getElementById('progress');
      let width = 0;
      let id;

      function progressStatus() {
        if (width >= 100) {
          clearInterval(id);
        } else {
          width++;
          elem.style.width = width + '%';
        }
      }

      elem.addEventListener('mouseenter', () => {
        clearInterval(id);
      });

      elem.addEventListener('mouseleave', () => {
        id = setInterval(progressStatus, 50);
      });

      id = setInterval(progressStatus, 50);
    };

    progress();
  }, []);

  return (
    <div id="progress" style={{ width: '0%', height: '20px', backgroundColor: 'blue' }}>
    </div>
  );
};

export default Notification;
