import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
	'em em-rolling_on_the_floor_laughing';
	'em em-laughing';
	'em em-smiley';
	'em em-slightly_smiling_face';
	'em em-neutral_face';
	'em em-confused';
	'em em-angry';
	getColour() {
		if (this.props.votes >= 15) {
			return '#4caf50';
		} else if (this.props.votes >= 12) {
			return '#8bc34a';
		} else if (this.props.votes >= 9) {
			return '#cddc39';
		} else if (this.props.votes >= 6) {
			return '#ffeb3b';
		} else if (this.props.votes >= 3) {
			return '#ffc107';
		} else if (this.props.votes >= 0) {
			return '#ff9800';
		} else {
			return '#f44336';
		}
	}
	displayEmoji() {
		if (this.props.votes >= 15) {
			return 'em em-rolling_on_the_floor_laughing';
		} else if (this.props.votes >= 12) {
			return 'em em-laughing';
		} else if (this.props.votes >= 9) {
			return 'em em-smiley';
		} else if (this.props.votes >= 6) {
			return 'em em-slightly_smiling_face';
		} else if (this.props.votes >= 3) {
			return 'em em-neutral_face';
		} else if (this.props.votes >= 0) {
			return 'em em-confused';
		} else {
			return 'em em-angry';
		}
	}
	render() {
		return (
			<div className="Joke">
				<div className="Joke-buttons">
					<i className="fas fa-arrow-up" onClick={this.props.upvote} />
					<span className="Joke-votes" style={{ borderColor: this.getColour() }}>
						{this.props.votes}
					</span>
					<i className="fas fa-arrow-down" onClick={this.props.downvote} />
				</div>
				<div className="Joke-text">{this.props.text}</div>
				<div className="Joke-smiley">
					<i className={this.displayEmoji()} />
				</div>
			</div>
		);
	}
}

export default Joke;
