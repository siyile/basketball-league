import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    text: 'Loading'
  }

  state = {
    text: ''
  }

  componentDidMount(){
    const { text } = this.props
    this.setState(() => ({text}))

    const stopper = text + '...'
    this.interval = setInterval(() => {
      this.state.text === stopper
      ? this.setState(() => ({text}))
      : this.setState(({ text }) => ({text: text + '.'}))
    }, 150)
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div className='container'>
        <p className='text-center'>
          {this.state.text}
        </p>
      </div>
    )
  }
}
