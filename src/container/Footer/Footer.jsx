import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Footer.scss'

const Footer = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChangeInput(event) {
    const { name, value } = event.target
    setFormData({
      ...formData, [name]: value
    })
  }

  function handleSubmit() {
    setLoading(true)
    const contact = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      message: formData.message
    }

    client.create(contact).then((result) => {
      setLoading(false)
      setIsFormSubmitted(true)
    }).catch((error) => console.log(error))
  }

  return (
    <>
      <h2 className="head-text">Take a coffe &  chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt='email' />
          <a href="mailto:endrielbasani4@gmail.com" className='p-text'>endrielbasani4@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt='mobile' />
          <a href="tel: +355 69 576 6622" className='p-text'>+355 69 576 6622</a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input type="text" className="p-text" name='name' placeholder='Your Name' value={formData.name} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input type="email" className="p-text" name='email' placeholder='Your Email' value={formData.email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your message'
              value={formData.message}
              onChange={handleChangeInput}
              name='message'
            />
          </div>
          <button className="p-text" type='button' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
        </div>
        
        : <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      }
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')
