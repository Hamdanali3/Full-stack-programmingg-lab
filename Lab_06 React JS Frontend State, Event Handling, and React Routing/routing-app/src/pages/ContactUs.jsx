import { useState } from 'react'

function ContactUs() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Your message has been sent!')
    setContact({ name: '', email: '', message: '' })
  }

  return (
    <section>
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={contact.message}
          onChange={handleChange}
          placeholder="Message"
          rows="4"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </section>
  )
}

export default ContactUs
