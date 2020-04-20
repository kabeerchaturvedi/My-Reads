import React from 'react'
import {withRouter} from 'react-router'
import * as BooksAPI from "../BooksAPI";
import Books from './Books';

class SearchBooks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
        }
    }
//updating the book shelf
ModifyBookShelf = async (bookUpdated, updatedList) => {
        let {books} = this.state;
        let isBookNotUpdated = true;
        books = books.map((book) => {
            if (book.id === bookUpdated.id) {
                Object.keys(updatedList).forEach((shelfName) => {
                    if (updatedList[shelfName].includes(book.id)) {
                        book.shelf = shelfName;
                        isBookNotUpdated = false;
                    }
                });
            }
            return book;
        });

        if (isBookNotUpdated) {
            const newBook = await this.addNewBook(bookUpdated)
            books.push(newBook);
        }

        this.setState({
            books,
        });
    };
//getting the search results
//if the value matches then it is stored in books as setState
//otherwise an empty array is passed in the setState
    async getSearchResults(e) {
        if (e.target.value) {
            let books = await BooksAPI.search(e.target.value)
            if (books.error) {
                books = []
            }
            this.setState({
                books
            })
        } else {
            this.setState({
                books: []
            })
        }
    }

    render() {
        const {books} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" autoFocus={true}
                               onChange={(e) => this.getSearchResults(e)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((item, index) => (
                            <Books key={index} book={item} ModifyBookShelf={this.ModifyBookShelf}/>
                        ))}</ol>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBooks)



