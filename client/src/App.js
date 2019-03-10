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

		this.addBookButton = document.querySelector("#add-new");

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

	handleSubmit(evt) {
		evt.preventDefault();
		console.log(evt.target.elements);
	}

	renderBookForm() {
		document.querySelector("#add-book-form").classList.toggle("hide");
		document.querySelector("#add-book").classList.toggle("hide");
	}

	render() {
		let bookList = this.state.bookList.map((book, i) => (
			<BookItem key={i} className="book-item" book={book} />
		));

		return (
			<div id="wrapper" className="App">
				<header id="page-header">
					<form className="inline-form">
						<h2 id="page-title">Personal Book Tracker</h2>{" "}
						<div id="search">
							<input
								id="search-bar"
								name="search-bar"
								type="text"
								data-role="input"
								data-search-button="true"
								placeholder="Search"
							/>
						</div>
					</form>
					<div id="actions">
						<button
							className="button success"
							id="add-book"
							onClick={() => this.renderBookForm()}
						>
							+ Add Book
						</button>
						<form
							id="add-book-form"
							onSubmit={e => this.handleSubmit(e)}
							className="hide"
						>
							<h3>
								Add A New Book{" "}
								<div className="close" onClick={e => this.renderBookForm(e)}>
									X
								</div>
							</h3>
							<div className="row">
								<div className="form-group cell-md-6">
									<input name="title" type="text" placeholder="Title" />
								</div>
								<div className="form-group cell-md-6">
									<input
										name="author"
										type="text"
										data-history="true"
										placeholder="Author"
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group cell-md-6">
									<input name="source" type="text" placeholder="Source" />
								</div>
								<div className="form-group cell-md-6">
									<input name="genre" type="text" placeholder="Genre" />
								</div>
							</div>

							<div className="row ">
								<div className="form-group cell-md-4">
									<input
										data-role="input"
										data-prepend="<span class='mif-dollar2'></span>"
										name="price"
										type="number"
										placeholder="Price"
									/>
								</div>
								<div className="form-group cell-md-4">
									<input
										name="tags"
										type="text"
										data-role="taginput"
										defaultValue="original, series,  self-help"
									/>
								</div>
								<div className="form-group cell-md-4">
									<input
										name="isRead"
										type="checkbox"
										data-role="switch"
										data-caption="Read It?"
									/>
									<input
										name="hardCopy"
										type="checkbox"
										data-role="switch"
										data-caption="Hard Copy?"
									/>
								</div>
							</div>

							<div className="form-group">
								<button
									className="button success"
									id="submit-book"
									type="submit"
								>
									Add Book
								</button>
								<input type="button" className="button" value="Clear" />
							</div>
						</form>
					</div>
				</header>
				<section id="lists">
					<div id="main-book-list">
						<h3 className="list-title">All Books</h3>
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
				</section>
				<section id="stats" />
				<footer />
			</div>
		);
	}
}

export default App;
