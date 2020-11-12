import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';
import Joke from './Joke';

class JokeList extends Component {
	static defaultProps = {
		num_jokes: 10
	};
	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
			loading: false
		};
		this.seenJokes = new Set(this.state.jokes.map((joke) => joke.joke));
		console.log(this.seenJokes);
		this.handleVote = this.handleVote.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}
	async getJokes() {
		try {
			let jokes = [];
			while (jokes.length < this.props.num_jokes) {
				let response = await axios.get('https://icanhazdadjoke.com/', {
					headers: { Accept: 'application/json' }
				});
				let newJoke = response.data.joke;
				if (!this.seenJokes.has(newJoke)) {
					jokes.push({ joke: response.data.joke, votes: 0, id: uuidv4() });
				} else {
					console.log('Duplicate found');
					console.log(newJoke);
				}
			}
			this.setState(
				(currState) => ({
					jokes: [ ...currState.jokes, ...jokes ],
					loading: false
				}),
				() => {
					window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
				}
			);
		} catch (err) {
			console.log(err);
			this.setState({ loading: false });
		}
	}
	handleVote(id, delta) {
		this.setState(
			(currState) => ({
				jokes: currState.jokes.map((joke) => (joke.id === id ? { ...joke, votes: joke.votes + delta } : joke))
			}),
			() => {
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
			}
		);
	}
	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}
	render() {
		if (this.state.loading) {
			return (
				<div className="JokeList-spinner">
					<i className="far fa-laugh fa-spin fa-8x" />
					<h2 className="JokeList-title">Loading... </h2>
				</div>
			);
		}
		let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
		let jokes = sortedJokes.map((joke) => (
			<Joke
				key={joke.id}
				text={joke.joke}
				votes={joke.votes}
				upvote={() => this.handleVote(joke.id, 1)}
				downvote={() => this.handleVote(joke.id, -1)}
			/>
		));
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="Dad Jokes"
					/>
					<button className="JokeList-btn" onClick={this.handleClick}>
						New Jokes
					</button>
				</div>

				<div className="JokeList-jokes">{jokes}</div>
			</div>
		);
	}
}

export default JokeList;
