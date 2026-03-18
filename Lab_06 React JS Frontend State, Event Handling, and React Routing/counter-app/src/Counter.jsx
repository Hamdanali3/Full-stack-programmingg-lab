import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1))
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <section className="counter-card" aria-label="Counter">
      <p className="count-label">Current Count</p>
      <p className="count-value">{count}</p>

      <div className="actions">
        <button type="button" onClick={handleIncrement}>
          Increment
        </button>
        <button type="button" onClick={handleDecrement} disabled={count === 0}>
          Decrement
        </button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default Counter
