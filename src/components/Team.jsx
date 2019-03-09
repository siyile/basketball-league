import { Component } from 'react'
import { getTeam } from '../api';
import PropTypes from 'prop-types'


export default class Team extends Component {
  static propTypes= {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }


  state = {
    team: null
  }

  componentDidMount(){
    const { id } = this.props
    this.fetchTeamData(id)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.id !== this.props.id){
      this.fetchTeamData(nextProps.id)
    }
  }

  fetchTeamData(id){
    this.setState(() => ({team: null}))

    getTeam(id)
      .then(team => this.setState(({
        team,
      })))
  }

  render() {
    return (
      this.props.children(this.state.team)
    )
  }
}
