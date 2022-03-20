import "./InfoBar.css"
import onlineIcon from "../../icons/onlineIcon.png"
import closeIcon from "../../icons/closeIcon.png"

import "./InfoBar.css"

function InfoBar(props) {
    return ( 
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="Ícono online" className="onlineIcon" />
                <h3>{props.room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="Ícono de cierre" /></a>
            </div>
        </div>
     );
}

export default InfoBar;