import React from 'react'
import { Link, Route} from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Bookshelf, {getShelfTypes,getShelfTypeName} from './Component/Bookshelf'
import Search from './Component/Search'
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
    if (this.state.books){
        book.loading=true;
        this.setState(state=>({
          books:state.books.filter(b => b.id !== book.id).concat([book])
        }))
        BooksAPI.update(book,shelf).then(()=>{
        book.shelf=shelf;
        book.loading = false;
        this.setState(state => ({books:state.books.filter(b=>b.id !==book.id).concat([book])
      }));
    });
  }
};

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({history})=> (
          <Search
            searchResult={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>

        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>Book Management Tool</h1>
            </div>
            <div className="list-books-content">
              <div>
                {getShelfTypes().map((shelf)=>(
                  <div key='shelf' className="bookshelf">
                    <h2 className="bookshelf-title">{getShelfTypeName(shelf)}</h2>
                    <Bookshelf
                      books={this.state.books.filter((book) => book.shelf===shelf).sort(sortBy('title'))}
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
