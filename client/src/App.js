import React, { Component } from "react";
import BookItem from "./components/BookItem";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: [],
			readList: [],
			unreadList: [],
			wishList: [],
			booksRead: 0,
			booksByGenre: {},
			formResult: "",
			message: "",
			msgClass: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.displayAllBooks = this.displayAllBooks.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	componentDidMount() {
		this.displayAllBooks();

		// Separate books into read,unread and wishlist
		// Calculate numbers
		// this.calcNumBooks();
		// this.calcBooksByGenre();

		this.addBookButton = document.querySelector("#add-new");
		this.formResult = document.querySelector("#form-result");
		this.message = document.querySelector("#message");
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.message !== this.state.message) {
			this.setState({ formResult: "", msgClass: "" });
		}

		if (prevState.formResult !== this.state.formResult) {
			this.setState({ message: "", msgClass: "" });
		}
	}

	displayAllBooks() {
		let bookArr = [],
			wishList = [];
		this.getAllBooks()
			.then(res => {
				res.books.forEach(book => {
					if (book.inWishList) {
						wishList.push(book);
					} else {
						bookArr.push(book);
					}
				});
				this.setState({ bookList: bookArr, wishList: wishList });
			})
			.catch(err => console.log(err));
	}

	getAllBooks = async () => {
		const response = await fetch("/books");
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	async handleSubmit(evt) {
		try {
			evt.preventDefault();
			let form = evt.target;

			const data = {
				title: form.elements.title.value,
				author: form.elements.author.value,
				genre: form.elements.genre.value,
				tags: form.elements.tags.value,
				source: form.elements.source.value,
				price: form.elements.price.value,
				inWishList: form.elements.inWishList.checked,
				isRead: form.elements.isRead.checked,
				hardCopy: form.elements.hardCopy.checked
			};

			console.log(data);
			const res = await fetch("/books", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			const body = await res.json();

			if (res.status === 200) {
				console.log(body);
				if (body.error) {
					this.setState({ formResult: body.error });
				} else {
					form.reset();
					this.renderBookForm();
					this.setState({ formResult: body.message });
					this.displayAllBooks();
				}
			} else {
				this.setState({ formResult: "Error Occured", msgClass: "error" });
			}
		} catch (err) {
			throw Error(err);
		}
	}

	renderBookForm() {
		document.querySelector("#add-book-form").classList.toggle("hide");
		document.querySelector("#add-book-btn").classList.toggle("hide");
		this.setState({ formResult: "" });
	}

	async deleteBook(element, book) {
		try {
			// console.log(element);

			let [title, author] = [book.title, book.author];

			const res = await fetch(`/books/${book._id}`, {
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});

			console.log(book);

			if (res.status === 200) {
				this.setState({
					message: `${title} by ${author} Successfully Deleted`
				});
				element.parentElement.classList.add("delete-fade");

				setTimeout(() => {
					this.displayAllBooks();
				}, 800);
			} else {
				this.setState({
					message: `There was an error deleting ${title} by ${author}`
				});
			}
		} catch (err) {
			throw Error(err);
		}
	}

	renderList(list) {
		return list.map((book, i) => (
			<BookItem
				key={i}
				className="book-item"
				book={book}
				deleteBook={this.deleteBook}
			/>
		));
	}

	render() {
		let bookList = this.renderList(this.state.bookList);

		let wishList = this.renderList(this.state.wishList);

		return (
			<div id="wrapper" className="App">
				<header id="nav">
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
				</header>
				<div id="main-content">
					<section id="page-header">
						<div id="actions">
							<button
								className="button success"
								id="add-book-btn"
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
									<div
										className="close mif-cross mif-2x"
										onClick={e => this.renderBookForm(e)}
									/>
								</h3>
								<div className="row">
									<div className="form-group cell-md-6">
										<input
											name="title"
											type="text"
											placeholder="Title"
											required
										/>
									</div>
									<div className="form-group cell-md-6">
										<input
											name="author"
											type="text"
											data-history="true"
											placeholder="Author"
											required
										/>
									</div>
								</div>

								<div className="row">
									<div className="form-group cell-md-4">
										<input name="source" type="text" placeholder="Source" />
									</div>
									<div className="form-group cell-md-4">
										<input name="genre" type="text" placeholder="Genre" />
									</div>
									<div className="form-group cell-md-4">
										<input
											data-role="input"
											data-prepend="<span class='mif-dollar2'></span>"
											name="price"
											type="number"
											placeholder="Price"
											min="0"
										/>
									</div>
								</div>

								<div className="row ">
									<div className="form-group cell-md-5">
										<input
											name="tags"
											type="text"
											placeholder="original, series, self-help"
										/>
									</div>
									<div id="checkboxes" className="form-group cell-md-7">
										<input
											name="inWishList"
											type="checkbox"
											data-role="switch"
											data-caption="Wishlist?"
										/>
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
							<span id="form-result">{this.state.formResult}</span>
							<span id="message" className={this.state.msgClass}>
								{this.state.message}
							</span>
						</div>
					</section>
					<section id="lists">
						<div id="main-book-list">
							<h3 className="list-title">All Books </h3>
							<ul id="book-list-ul">{bookList}</ul>
						</div>

						<div id="wish-list">
							<h3 className="list-title">Wishlist</h3>
							<ul id="wish-list-ul">{wishList}</ul>
						</div>
					</section>
					<section id="stats" />
					<footer />
				</div>
			</div>
		);
	}
}

export default App;
