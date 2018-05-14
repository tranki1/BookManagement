import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';
import Bookshelf from '../Component/Bookshelf';
import * as BooksAPI from '../BooksAPI';


class Search extends Component{
  state ={
    books:[],
    query:''
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState({query:'',books:[]})
    }
    this.setState({query : query.trim()})
    /*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */
    BooksAPI.search(query).then((books)=>{
  		if(query !== this.state.query) return;
      if ('error' in books){
        books=[]
      }
      else {
				books.map(book => (this.props.searchResult.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)));
      }
      this.setState({books:books.sort(sortBy('title'))});
    })
  }
  render(){
    const onUpdateBook = this.props.onUpdateBook;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              onChange={(e)=>this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            books={this.state.books}
            onUpdateBook={onUpdateBook}
          />
        </div>
      </div>

    )
  }
}

Search.propTypes = {
  searchResult: PropTypes.array.isRequired,
  onUpdateBook:PropTypes.func.isRequired
}

export default Search;
