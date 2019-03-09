import { Component } from 'react'

export default class DynamicImport extends Component {
  state = {
    component: null
  }

  componentDidMount(){
    this.props.load()
      .then((mod) => this.setState(() => ({
        component: mod.default
      })))
  }

  render() {
    const { component } = this.state
    return this.props.children(component)
  }
}
