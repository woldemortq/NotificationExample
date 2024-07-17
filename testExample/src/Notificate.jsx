import './App.css'; // Подключаем внешний CSS файл
import Notification from "./progressEffect.jsx";

function Notificate(props) {
    const {status} = props
    const {label} = props
    const {text} = props
    return (
        <div className="notification">
            <div className="column">
                <div>
                    <img src={label} alt="Notification ok!" />
                </div>
                <div className="info">
                    <h3 id="title">{status}</h3>
                    <p id="info">{text}</p>
                    <div className="progress-bar-inner">
                        <div className="progress-bar" id="progress"></div>
                    </div>
                </div>
            </div>
            <Notification/>
        </div>)
        
}

export default Notificate
