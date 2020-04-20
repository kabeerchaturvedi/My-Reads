import React from 'react'
import {withRouter} from 'react-router'
import * as BooksAPI from '../BooksAPI';

class Books extends React.Component {
    constructor(props) {
        super(props);

    }

    //updating the bookshelf
    async changeBookShelf(e, book) {
        const updatedList = await BooksAPI.update(book, e.target.value);
        await this.props.ModifyBookShelf(book, updatedList);
    }

    render() {
        const { book, pageName } = this.props

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.changeBookShelf(e, book)} value={book.shelf} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading"
                                        disabled={book.shelf === "currentlyReading"}>Currently Reading
                                </option>
                                <option value="wantToRead" disabled={book.shelf === "wantToRead"}>Want to Read
                                </option>
                                <option value="read" disabled={book.shelf === "read"}>Read</option>
                                <option value="none" disabled={!book.shelf || book.shelf === ""}>None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                </div>
            </li>
        )
    }
}

export default withRouter(Books)