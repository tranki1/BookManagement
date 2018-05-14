import React, {Component} from 'react'
import PropTypes from 'props-types'

clas Bookshelf extends Component{
  render(){
    const {books, updateBook, typeOfShelves} = this.props;
    return(
      <ol className="books-grid">
        {books.map((book)=>(
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                <div className="book-shelf-changer">
                  <select
                    onChange ={(e)=> updateBook(book,e.target.value)}
                    value={book.shelf}>
                    <option disabled>Move to...</option>
                    {typeOfShelves.map((shelf)=>(
                      <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                    ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors.join(', ')}</div>
            </div>
          </li>
        ))}


    )
  }
}

Bookshelf.PropTypes ={
  books: PropTypes.array.isRequired,
  typeOfShelves: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired

}

export default Bookshelf;
