import React, { Component } from 'react'
import './Form.scss'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

class Form extends Component {
  constructor(getFormData) {
    super(getFormData)

    this.state = {
      name: '',
      quote: '',
      rank: 'Padawan',
      nameErr: '',
      quoteErr: '',
      isComplete: false
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
    if (this.state.isComplete) {
      return <Redirect to='/movies'/>
    }
    const { name, quote, rank, nameErr, quoteErr } = this.state

    let nameClass = nameErr ? 'error' : ''
    let quoteClass = quoteErr ? 'error': ''

    return (
      <div className="login-page">
        <form className="form-background">
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

          <input 
            value={quote} 
            name="quote" 
            placeholder="Enter your favorite quote"
            className={quoteClass}
            onChange={this.handleChange}
          />
          <div>
            {quoteErr && <p>No Quote</p>}
          </div>

          <select 
            value={rank} 
            name="rank" 
            onChange={this.handleChange}
          >
            <option value="Padawan">Padawan</option>
            <option value="Jedi Knight">Jedi Knight</option>
            <option value="Jedi Master">Jedi Mastern</option>
          </select>

            <button type="button" className="login-btn" onClick={this.handleSubmit}> May the dark force Be With You</button>
        </form>
      </div>
    )
  }
}

export default Form

Form.propTypes = {
  getFormData: PropTypes.func.isRequired
}