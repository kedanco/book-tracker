import React from "react";
class BookItem extends React.Component {
	render() {
		let book = this.props.book;
		return (
			<li className={this.props.className}>
				Title:{book.title} Author: {book.author}
			</li>
		);
	}
}
export default BookItem;
