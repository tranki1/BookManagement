import React from 'react'
import { Link, Route} from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Bookshelf, {getShelfTypes} from './Component/Bookshelf'
import Search from './Component/Search'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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
      <MuiThemeProvider>
      <div className="app">
        <Route path="/search" render={({history})=> (
          <Search
            searchResult={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>

        <Route exact path='/' render={()=>(
          <div className="list-books">
            <AppBar
              title="Book Management Tool"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              />

            <div className="list-books-content">
              <div>
                {getShelfTypes().map((shelf)=>(
                  <div key='shelf' className="bookshelf">
                    <br/>
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
              >
                <FloatingActionButton>
                		<ContentAdd />
                </FloatingActionButton>
              </Link>

            </div>
          </div>
        )}/>

      </div>
      </MuiThemeProvider>
    )
  }
}

export default BooksApp
