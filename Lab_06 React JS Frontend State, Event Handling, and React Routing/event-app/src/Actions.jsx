import { useState } from 'react'

const colors = ['#fff7ed', '#ecfeff', '#eef2ff', '#ecfccb', '#ffe4e6']

function Actions() {
  const [message, setMessage] = useState('Click a button to trigger an action.')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [isHovered, setIsHovered] = useState(false)

  const showMessage = () => {
    setMessage('Message shown successfully with onClick event handling.')
  }

  const changeBackgroundColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    setBgColor(colors[randomIndex])
    setMessage('Background color has been changed.')
  }

  const showAlert = () => {
    alert('This is an alert triggered by the Show Alert button!')
  }

  return (
    <section className="actions-card" style={{ backgroundColor: bgColor }}>
      <p
        className="status-text"
        style={{ color: isHovered ? '#dc2626' : '#0f172a' }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {message}
      </p>

      <div className="button-group">
        <button type="button" onClick={showMessage}>
          Show message
        </button>
        <button type="button" onClick={changeBackgroundColor}>
          Change background color
        </button>
        <button type="button" onClick={showAlert}>
          Show alert
        </button>
      </div>
    </section>
  )
}

export default Actions
