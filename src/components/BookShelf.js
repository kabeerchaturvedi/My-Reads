import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {withRouter} from 'react-router'
import Books from './Books';


class BookShelf extends Component {
    constructor(props) {
        super(props);
    }

    //adding a new book
    async addNewBook(book) {
        const newBook = await BooksAPI.get(book.id);
        return newBook
    }

    render() {
        const {books, shelfName} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((book) => book.shelf === shelfName).map((item, index) => (
                            <Books key={index} book={item} ModifyBookShelf={this.props.ModifyBookShelf}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(BookShelf)

