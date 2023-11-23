import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Testimonial.scss'

const Testimonial = () => {

  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const testimonialsQuery = '*[_type == "testimonials"]'
    const brandsQuery = '*[_type == "brands"]'

    client.fetch(testimonialsQuery).then((data) => {
      let final = data.filter(dt => dt._id !== "0bf9c86d-bcc4-47df-8c6a-208a07aa28bb")
      setTestimonials(final)
    }).catch((error) => console.log(error))

    client.fetch(brandsQuery).then((data) => {
      setBrands(data)
    }).catch((error) => console.log(error))
  }, [])

  function handleClick(idx) {
    setCurrentIndex(idx)
  }

  const test = testimonials[currentIndex]

  let condition = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1

  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(test.imageurl)} alt="testimonial" />
            <div className="app__testimonial_content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(condition)}>
              <HiChevronLeft />
            </div>
            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonials-brands app__flex">
        {brands.map((brand, index) => (
          <motion.div
            key={brand._id}
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonial, 'app__testimonial'), 'testimonial', 'app__primarybg')
