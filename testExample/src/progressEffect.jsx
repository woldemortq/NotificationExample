import {useEffect} from "react";
const Notification = (done) => {
    useEffect(() => {
      const progress = () => {
        let elem = document.getElementById('progress');
        let width = 0;
        let id = setInterval(progressStatus, 10);
        function progressStatus() {
          if (width >= 100) {
            clearInterval(id);
          } else {
            width++;
            elem.style.width = width + '%';
          }
        }
      };
      progress();
    }, []);
  }
  export default Notification;