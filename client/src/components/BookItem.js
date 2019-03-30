import React from "react";
class BookItem extends React.Component {
	render() {
		let book = this.props.book;
		let background = "https://picsum.photos/240/300";

		return (
			<li className={this.props.className}>
				<div
					className="book-image"
					style={{
						background: `url(${background})`
					}}
				/>
				<div className="book-actions">
					<span
						className="edit mif-pencil mif-2x"
						onClick={e => this.props.renderEditForm(book)}
					/>
					<div
						className="close mif-cross mif-2x"
						onClick={e => this.props.deleteBook(e.target, book)}
					/>
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
