import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Sala de chat en tiempo real <span>💬</span></h1>
      <h2>Creada con React.Js, Express.Js, Node.Js y Socket.IO</h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>Personas en la sala:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;