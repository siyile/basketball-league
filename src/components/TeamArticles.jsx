import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import { getTeamsArticles } from '../api';
import Sidebar from './Sidebar';
import Articles from './Articles';
import Loading from './Loading';

export default class TeamArticles extends Component {
  state = {
    loading: true,
    teamArticles: null,
  }

  componentDidMount(){
    getTeamsArticles(this.props.match.params.teamId)
      .then((articles) => this.setState(() => ({
        loading: false,
        teamArticles: articles.map((article) => article.title)
      })))
  }


  render() {
    const { loading, teamArticles } = this.state
    const { path } = this.props.match

    return (loading === true
    ? <Loading />
    : <div className='container two-column'>
        <Sidebar 
          title='Articles'
          list={teamArticles}
          loading={loading}
          {...this.props}
        />

        <Route path={`${path}/:id`} render={({ match }) => (
          <Articles id={match.params.id} teamId={match.params.teamId}>
            {(article) => !article ? <Loading />: (
              <div className='panel'>
                <article className='article' key={article.id}>
                  <h1 className='header'>{article.title}</h1>
                  <p>{article.body}</p>
                </article>
              </div>
            )}
          </Articles>
        )} />
      </div>
    )
  }
}
