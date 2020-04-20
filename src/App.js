import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css'
import SearchBooks from './components/Searchbooks'
import FrontPage from './components/FrontPage'

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []

    }
  }


  render() {


    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/search">
              <SearchBooks />
            </Route>
            <Route path="/">
              <FrontPage books={this.state.books} />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
