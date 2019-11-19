import * as React from 'react'
import { Link } from 'react-router-dom'
// import * as Moment from 'moment'
import { getPopular } from '../../http/popular'
import {Input} from 'antd'
import { getMoviesByTitle } from '../../http/search'

const {Search} = Input

class MovieSearch extends React.Component {
    state = {
        movies: null
    }
    componentDidMount() {
        this.fetchPopular()
    }
    fetchPopular = async (id) => {
        const json = await getPopular()
        console.log(json)
        this.setState({ movies: json.results })
    }
    fetchByTitle = async (query) => {
        const json = await getMoviesByTitle(query)
        console.log(json)
        this.setState({ movies: json.results })
    }
    renderMovie(movie) {
        return <li key={movie.id}><Link to={`/details/${movie.id}`}>{movie.title}</Link></li>
    }
    renderMovies() {
        const { movies } = this.state
        if (!movies) return false
        return <ul>{this.state.movies.map(this.renderMovie)}</ul>
    }
    render() {
        return (
            <div style={{ margin: '10px' }}>
                <Search
                    placeholder="Search by Title"
                    onSearch={this.fetchByTitle}
                    enterButton="Search"
                    size="large"
                />
                {this.renderMovies()}
            </div>
        )
    }
}

export default MovieSearch