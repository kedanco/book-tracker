import React from "react";
class BookItem extends React.Component {
	render() {
		let book = this.props.book;
		return (
			<li className={this.props.className}>
				<p>Title: {book.title}</p>
				<p>Author: {book.author}</p>
			</li>
		);
	}
}
export default BookItem;
