import React from 'react'
import { Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf, {getShelfTypes,getShelfTypeName} from './Component/Bookshelf'
import './App.css'


/**
 * @description Main App component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    //Get books through gbs_api
    BooksAPI.getAll().then((data)=>{
      this.setState({books:data});
      console.log(data);
    });
  }

  updateBook =(book,shelf) =>{
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(()=>{
        book.shelf=shelf;
        this.setState(state => ({books:state.books.filter(b=>b.id !==book.id).concat([book])
      }));
    });
  }
};

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({history})=> (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {getShelfTypes().map((shelf)=>(
                  <div key='shelf' className="bookshelf">
                    <h2 className="bookshelf-title">{getShelfTypeName(shelf)}</h2>
                    <Bookshelf
                      books={this.state.books.filter((book) => book.shelf===shelf)}
                      typeID={shelf}
                      onUpdateBook={this.updateBook}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                className='add-books'
              >Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
