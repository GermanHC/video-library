import React from 'react';

import Nav from '../Nav/Nav';
import Routes from '../Routes/Routes';
import LoginContext from '../Login/LoginContext';

const API_KEY = `api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

export default class extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('user')),
        movies: (localStorage.getItem('movies') !== "undefined" && localStorage.getItem('movies') !== null )? JSON.parse(localStorage.getItem('movies')) : [],
        moviesSearch: (localStorage.getItem('moviesSearch') !== "undefined" && localStorage.getItem('moviesSearch') !== null) ? JSON.parse(localStorage.getItem('moviesSearch')) : [],
        genres: localStorage.getItem('genres') !== "undefined" ? JSON.parse(localStorage.getItem('genres')) : [],
        collections: (localStorage.getItem('collections') !== "undefined" && localStorage.getItem('collections') !== null )? JSON.parse(localStorage.getItem('collections')) : []
    }
    render () {
        return (
            <LoginContext.Provider value={{
              logged: Boolean(this.state.user),
              findUsers: this.findUsers,
              user: this.state.user,
              movies: this.state.movies,
              moviesSearch: this.state.moviesSearch,
              genres: this.state.genres,
              findMovies: this.findMovies,
              findMovieByID: this.findMovieByID,
              findMovieByQuery: this.findMovieByQuery,
              collections: this.state.collections,
              findCollections: this.findCollections,
              login: this.login,
              logout: this.logout,
              addPost: this.addPost
            }}>
              <Nav />
              <Routes />
            </LoginContext.Provider>
          )
        }
        
    findUsers = async () => {
        const users = JSON.parse(localStorage.getItem('VideoLibrary')) ? 
            JSON.parse(localStorage.getItem('VideoLibrary')).users 
            : []
        return users
    }

    _attemptLogin = async ({ user, password }) => {
        const users = await this.findUsers()
        const foundUser = users && users.find(candidate =>
            candidate.login.username === user
        )
        return foundUser
    }

    login = async credentials => {
        const user = await this._attemptLogin(credentials)
        if (!user) {
            const newUser = { 
                login: {
                    uuid: this._guid(),
                    username: credentials.user,
                    password: credentials.password,
                        }
                };
            this._addUser(newUser)
        }
        if (user.login.password !== credentials.password){
            throw new Error('Credentials error')
        }

        localStorage.setItem('user', JSON.stringify(user))
      
        this.setState({ user })
        return user
    }

    logout = () => {
        this.setState({ user: null })
        localStorage.removeItem('user')
    }
    
    addPost = post => {
        post.date = new Date()
        const previousState = this.state
        const uuid = previousState.user.login.uuid
        const nextState = {
            ...previousState,
            posts: {
            ...previousState.posts,
            [uuid]: [
                post,
                ...previousState.posts[uuid]
            ]
            }
        }
        this.setState(nextState)
        localStorage.setItem(
            'posts',
            JSON.stringify(nextState.posts)
        )
    }

    _addUser = user => {
        const previousState = this.state
        const prevUsers = previousState.users ? previousState.users : []
        const nextState = {
            ...previousState,
            users: [
                ...prevUsers,
                user
            ]
        }
        this.setState(nextState)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ user })
        return user
    }

    componentDidUpdate () {
        localStorage.setItem(
            'VideoLibrary',
            JSON.stringify(this.state)
        )
    }

    findQueryToApi = async (URL) => {
        const response = await fetch(URL)
        const { results } = await response.json()
        return results
    }

    findMovies = async () => {
        const MOVIES_DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        let movies = await this.findQueryToApi(MOVIES_DISCOVER_URL)
           
        localStorage.setItem(
            'movies',
            JSON.stringify(movies)
        )

        void await this.findGenres()
        
        return movies
    }

    findMovieByID = async props => {
        const movies = await this.findMovies()
        const foundMovie = movies && movies.find(mov =>
            mov.id === props
        )
      
        if(movies.length === 0 || foundMovie.length === 0)
        {
            const MOVIE_ID_URL = `https://api.themoviedb.org/3/movie/${props}?${API_KEY}&language=en-US`;
            const results = await this.findQueryToApi(MOVIE_ID_URL)
            const movie = results ? results[0] : null
        
            void await this.findGenres()
            return movie
        }
        void await this.findGenres()
        return foundMovie
    }

    findMovieByQuery = async props => {
        const MOVIE_QUERY_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=en-US&query=${props}&page=1&include_adult=false`;
        let movies = await this.findQueryToApi(MOVIE_QUERY_URL)
        
        localStorage.setItem(
            'moviesSearch',
            JSON.stringify(movies)
        )

        void await this.findGenres()
        this.setState({ moviesSearch: movies })
        return movies
    }

    findGenres = async props => {
        const { genres } = this.state
       
        if(genres !== null && !genres.length === 0 )
            return genres
       
        const GENRES_QUERY_URL = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`;
        const response = await fetch(GENRES_QUERY_URL)
        const { genres : genresFound } = await response.json()
        localStorage.setItem(
            'genres',
            JSON.stringify(genresFound)
        )
        return genresFound
    }

    findCollections = async () => {
        debugger
        var collections = JSON.parse(localStorage.getItem('VideoLibrary')) ? 
            JSON.parse(localStorage.getItem('VideoLibrary')).collections 
            : []
        collections = collections === undefined && []
        return collections
    }

    _guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }
}