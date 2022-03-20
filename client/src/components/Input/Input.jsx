import './Input.css'

function Input({ message, setMessage , sendMessage }) {
  return (
    <form action="" className="form">
      <input
        type="text"
        className="input"
        placeholder="Escriba un mensaje aquí"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button className='sendButton' onClick={(e) => sendMessage(e)}>Enviar</button>
    </form>
  )
}

export default Input
