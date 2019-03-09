import { Component } from 'react'
import PropTypes from 'prop-types'
import { getArticle } from '../api';

export default class Articles extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired
  }

  state = {
    article: null
  }

  componentDidMount(){
    const { teamId, id } = this.props

    this.fetchArticleData(teamId, id)
  }

  componentWillReceiveProps(nextProps){
    const { teamId, id } = nextProps
    if (id !== this.props.id){
      this.setState(() => ({article: null}))

      this.fetchArticleData(teamId, id)
    }
  }

  fetchArticleData(teamId, articleId){
    getArticle(teamId, articleId)
      .then((article) => {this.setState(() => ({article}))})
  }

  render() {
    return this.props.children(this.state.article)
  }
}
