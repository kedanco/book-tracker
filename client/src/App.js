import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: [],
			readList: [],
			unreadList: [],
			wishList: [],
			booksRead: 0,
			booksByGenre: {}
		};
	}

	componentDidMount() {
		this.getAllBooks()
			.then(res => console.log(res))
			.catch(err => console.log(err));

		// Separate books into read,unread and wishlist

		// Calculate numbers
		// this.calcNumBooks();
		// this.calcBooksByGenre();
	}

	getAllBooks = async () => {
		const response = await fetch("/books");
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};

	render() {
		return (
			<div className="App">
				<h2>Title!</h2>
				{this.state.bookList}
			</div>
		);
	}
}

export default App;
