import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

class Form extends Component {
  constructor(getFormData) {
    super(getFormData)

    this.state = {
      name: '',
      quote: '',
      rank: '',
      nameErr: '',
      quoteErr: '',
      rankErr: false
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if(!this.state.name) {
      this.setState({ nameErr: true })
    } else {
      this.setState({ nameErr: false })
    }

    if(!this.state.quote) {
      this.setState({ quoteErr: true })
    } else {
      this.setState({ quoteErr: false })
    }

    if (this.state.name && this.state.quote) {
      const user = {
        name: this.state.name,
        quote: this.state.quote,
        rank: this.state.rank
      }
      this.props.getFormData(user)
      this.setState({ isComplete: true })
    }
  }


  render() {
    const {name, quote, rank, nameErr, quoteErr, rankErr} = this.state

    let nameClass = nameErr ? 'error' : ''
    let quoteClass = quoteErr ? 'error': ''
    let rankClass = rankErr ? 'error': ''

    return (
      <form>
        <label htmlFor="name">Name</label>
        <input 
          autoFocus 
          value={name} 
          name="name" 
          placeholder="Enter a name"
          className={nameClass}
          onChange={this.handleChange}
        />
        <div>
          {nameErr && <p>No Name</p>}
        </div>

        <label htmlFor="quote">Your favorite quote</label>
        <input 
          autoFocus 
          value={quote} 
          name="quote" 
          placeholder="Enter your favorite quote"
          className={quoteClass}
          onChange={this.handleChange}
        />
        <div>
          {quoteErr && <p>No Quote</p>}
        </div>

        <label htmlFor="rank">Rank</label>
        <select 
          value={rank} 
          name="rank" 
          className={rankClass}
          onChange={this.handleChange}
        >
          <option value="Padawan">Padawan</option>
          <option value="Jedi Knight">Jedi Knight</option>
          <option value="Jedi Master">Jedi Mastern</option>
        </select>
        <div>
          {rankErr && <p>No Rank</p>}
        </div>

        <Link to='/movies' onClick={this.handleSubmit}>
          <button type="button"> May the dark force Be With You</button>
        </Link>

      </form>
    )
  }
}

export default Form