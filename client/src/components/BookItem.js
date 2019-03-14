import React from "react";
class BookItem extends React.Component {
	render() {
		let book = this.props.book;
		return (
			<li className={this.props.className}>
				<div className="book-actions">
					<span className="edit mif-pencil mif-2x" />
					<div
						className="close mif-cross mif-2x"
						onClick={e => this.props.deleteBook(e.target, book)}
					/>
				</div>
				<div className="book-image">
					<img alt="book-cover" src="https://picsum.photos/140/210" />
				</div>
				<div className="book-title">
					{" "}
					<p className="wrap">{book.title}</p>
				</div>
				<div className="book-author">
					<p className="wrap">{book.author}</p>
				</div>
			</li>
		);
	}
}
export default BookItem;
