import React from "react";

class EditForm extends React.Component {
	render() {
		let book = this.props.book;
		let tags = "";
		book.tags.forEach(tag => {
			console.log(`${tags} ${tag} `);
			book.tags.length > 1 ? (tags += tag + ", ") : (tags = tag);
		});

		return (
			<div>
				<form
					id="edit-book-form"
					onSubmit={e => this.props.handleSubmit(e, "edit", book._id)}
				>
					<h3>Edit A Book </h3>
					<div
						className="close mif-cross mif-2x"
						onClick={() => this.props.closeEditForm()}
					/>
					<div className="row">
						<div className="form-group cell-md-6">
							<input
								name="title"
								type="text"
								placeholder="Title"
								defaultValue={book.title}
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
								defaultValue={book.author}
							/>
						</div>
					</div>

					<div className="row">
						<div className="form-group cell-md-4">
							<input
								name="source"
								type="text"
								placeholder="Source"
								defaultValue={book.source}
							/>
						</div>
						<div className="form-group cell-md-4">
							<input
								name="genre"
								type="text"
								placeholder="Genre"
								defaultValue={book.genre}
							/>
						</div>
						<div className="form-group cell-md-4">
							<input
								data-role="input"
								data-prepend="<span class='mif-dollar2'></span>"
								name="price"
								type="number"
								step="0.01"
								placeholder="Price"
								min="0"
								defaultValue={book.price}
							/>
						</div>
					</div>

					<div className="row ">
						<div className="form-group cell-md-5">
							<input
								name="tags"
								type="text"
								placeholder="Tags"
								defaultValue={tags}
							/>
						</div>
						<div id="checkboxes" className="form-group cell-md-7">
							<input
								name="inWishList"
								type="checkbox"
								data-role="switch"
								data-caption="Wishlist?"
								defaultChecked={book.inWishList}
							/>
							<input
								name="isRead"
								type="checkbox"
								data-role="switch"
								data-caption="Read It?"
								defaultChecked={book.isRead}
							/>
							<input
								name="hardCopy"
								type="checkbox"
								data-role="switch"
								data-caption="Hard Copy?"
								defaultChecked={book.hardCopy}
							/>
						</div>
					</div>

					<div className="form-group">
						<button className="button success" id="edit-book" type="submit">
							Save Changes
						</button>
						<input type="button" className="button" value="Clear" />
					</div>
				</form>
			</div>
		);
	}
}
export default EditForm;
