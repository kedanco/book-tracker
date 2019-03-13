import React from "react";
class BookItem extends React.Component {
	render() {
		let book = this.props.book;
		return (
			<li className={this.props.className}>
				<p>Title: {book.title}</p>
				<p>Author: {book.author}</p>
				<div className="close" onClick={() => this.props.deleteBook(book)}>
					X
				</div>
			</li>
		);
	}
}
export default BookItem;
