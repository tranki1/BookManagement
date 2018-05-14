import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-advanced';

const SHELF_TYPE_IDS = [
  'currentlyReading',
  'read',
  'wantToRead',
];

const SHELF_TYPE_NAMES = [
  'Currently Reading',
  'Read',
  'Want To Read',
];

export const getShelfTypes = () => SHELF_TYPE_IDS;
export const getShelfTypeName = (typeID) => {
  const TypeInternalIndex = SHELF_TYPE_IDS.indexOf(typeID);

  if (TypeInternalIndex === -1) {
		// If Category doesn't exists returns ''
	return '';
  }

	return SHELF_TYPE_NAMES[TypeInternalIndex];
};

class Bookshelf extends Component{

  render(){
    const {books, onUpdateBook} = this.props;
    return(
      <ol className="books-grid">
        {books.map((book)=>(
          <li key={book.id}>
            <Loader
              show={('loading' in book)? book.loading : false}
              message={<span><img src="three-dots.svg" width="50" alt=""/><div>Loading</div></span>}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                  <div className="book-shelf-changer">
                    <select
                      onChange ={(e)=> onUpdateBook(book,e.target.value)}
                      value={book.shelf}>
                      <option disabled>Move to...</option>
                      {getShelfTypes().map((shelf)=>(
                        <option key={shelf} value={shelf}>{getShelfTypeName(shelf)}</option>
                      ))}
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{('authors' in book) ? book.authors.join(', ') : ''}</div>
              </div>
            </Loader>
          </li>
        ))}
      </ol>
    )
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  typeID: PropTypes.oneOf(SHELF_TYPE_IDS),
  onUpdateBook: PropTypes.func.isRequired
}

export default Bookshelf;
