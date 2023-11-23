import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Skills.scss'

const Skills = () => {

  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const experiencesQuery = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(experiencesQuery).then((data) => {
      setExperiences(data)
    }).catch((error) => console.log(error))

    client.fetch(skillsQuery).then((data) => {
      let final = data.filter(dt => dt._id !== "ad7b7239-4433-477f-8a5e-68b8e037b5d0")
      let lastFinal = final.filter(dt => dt.bgColor !== "#313bac")
      setSkills(lastFinal)
    }).catch((error) => console.log(error))
  }, [])

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div
          className='app__skills-list'
        >
          {skills?.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name + index}
            >
              <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className='app__skills-exp'>
          {experiences?.map((experience, index) => (
            <motion.div
              className='app__skills-exp-item'
              key={index}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map((work, index) => (
                  <div key={index}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work'
                      data-tip
                      data-for={work.name}
                      key={work.name + index}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect='solid'
                      arrowColor='#fff'
                      className='skills-tooltip'
                    >
                      {work.desc}
                    </ReactTooltip>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app_skills'), 'skills', 'app__whitebg')
