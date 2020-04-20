import React, { Component } from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from '../BooksAPI';
import { withRouter } from "react-router";


class FrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    // Books are fetched after component is inserted into DOM
    async componentDidMount() {
        await this.getAllBooks()
    }

    //getting all the books
    async getAllBooks() {
        const books = await BooksAPI.getAll();
        this.setState({
            books
        });
    }
    //updating or modifying  the book shelf 
    ModifyBookShelf = async (updatedBook, updatedList) => {
        let { books } = this.state;
        let isBookNotUpdated = true;
        books = books.map((book) => {
            if (book.id === updatedBook.id) {
                Object.keys(updatedList).forEach((shelfName) => {
                    if (updatedList[shelfName].includes(book.id)) {
                        book.shelf = shelfName;
                        isBookNotUpdated = false;
                    }
                });
            }
            return book;
        });
//if books are not updated then changing the value of books stored in setState
        if (isBookNotUpdated) {
            books = books.filter((item) => item.id !== updatedBook.id)
        }

        this.setState({
            books,
        });
    };
    //mapping the data according to fetch the values for the book and shelf details
    //passing the shelf value as shelfName to children 
    //Passing the method to child component 
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {[...new Set(this.state.books.map(data => data.shelf))].sort().map((shelfName, index) => (
                            <BookShelf key={index} shelfName={shelfName} books={this.state.books}
                                ModifyBookShelf={this.ModifyBookShelf}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.props.history.push('/search')}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default withRouter(FrontPage)