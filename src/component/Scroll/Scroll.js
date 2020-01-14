import React from 'react'
import PropTypes from 'prop-types'

import './Scroll.scss'

const Scroll = ({ selectedMovie }) => {
  const { title, scrollText, episode } = selectedMovie
  return (
    <div className='scroll'>
      <div className="fade">
          <section className="star-wars">
            <div className="crawl">
              <div className="title">
                <p>Episode {episode}</p>
                <h1>{title}</h1>
              </div>
                <p>{scrollText}</p>
            </div>
          </section>
      </div>
    </div>
  )
}

export default Scroll

Scroll.propTypes = {
  selectedMovie: PropTypes.object
}
