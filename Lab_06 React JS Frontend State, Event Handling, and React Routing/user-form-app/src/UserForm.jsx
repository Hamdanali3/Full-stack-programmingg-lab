import { useState } from 'react'

function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submittedData, setSubmittedData] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      return
    }

    setSubmittedData(formData)
    setFormData({ name: '', email: '' })
  }

  return (
    <section className="card" aria-label="User form">
      <form onSubmit={handleSubmit} className="user-form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <button type="submit">Submit</button>
      </form>

      <div className="submitted-output">
        <h2>Submitted Data</h2>
        {submittedData ? (
          <>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
          </>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </section>
  )
}

export default UserForm
