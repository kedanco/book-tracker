import React, { Component } from "react";
import BookItem from "./components/BookItem";
// import BookList from "./components/BookList";

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
		let bookArr = [];
		this.getAllBooks()
			.then(res => {
				res.books.forEach(book => {
					bookArr.push(book);
				});
				this.setState({ bookList: bookArr });
			})
			.catch(err => console.log(err));

		// Separate books into read,unread and wishlist
		// Calculate numbers
		// this.calcNumBooks();
		// this.calcBooksByGenre();
	}

	componentDidUpdate(prevProps, prevState) {}

	getAllBooks = async () => {
		const response = await fetch("/books");
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};

	render() {
		let bookList = this.state.bookList.map((book, i) => (
			<BookItem key={i} className="book-item" book={book} />
		));

		return (
			<div className="App">
				<header id="page-header">
					<h2>Personal Book Tracker</h2>
				</header>
				<div id="main-book-list">
					<ul>{bookList}</ul>
				</div>

				<div id="read-list">
					<ul />
				</div>
				<div id="unread-list">
					<ul />
				</div>
				<div id="wish-list">
					<ul />
				</div>
				<section id="stats" />
				<footer />
			</div>
		);
	}
}

export default App;
