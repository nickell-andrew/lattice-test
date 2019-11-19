import * as React from 'react'
import { Link } from 'react-router-dom'
import * as Moment from 'moment'
import { getPosterUrl } from '../../http/images'
import { getDetails } from '../../http/details'

class MovieDetails extends React.Component {
    state = {
        movie: null
    }
    componentDidMount() {
        const { id } = this.props.match.params
        this.fetchDetails(id)
    }
    fetchDetails = async (id) => {
        const json = await getDetails(id)
        console.log(json)
        this.setState({ movie: json })
    }
    renderMovie(movie) {
        return <li key={movie.id}><Link to={`/details/${movie.id}`}>{movie.title}</Link></li>
    }
    renderDetails() {
        const { movie } = this.state
        const { id } = this.props.match.params
        if (!movie || String(movie.id) !== String(id)) return false
        return [
            <ul>
                <li>{movie.title}</li>
                <li>{movie.overview}</li>
                <li>{Moment(movie.release_date).format('MMM D YYYY')}</li>
            </ul>,
            <img src={getPosterUrl(movie.poster_path)} alt="" />]
    }
    render() {
        return (
            <div style={{ margin: '10px' }}>
                {this.renderDetails()}
            </div>
        )
    }
}

export default MovieDetails