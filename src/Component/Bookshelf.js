import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-advanced';
import { CSSTransitionGroup } from 'react-transition-group';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import SelectField from 'material-ui/SelectField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DotsLoader from '../icons/loaders/dots.svg';
import LoaderBox from './Loader';

const styles = {
	block: {
		maxWidth: 250,
	},
	checkbox: {
		marginBottom: 16,
		backgroundColor: 'white'
	},
	button: {
		marginRight: 12,
	},
	iconButton: {
		width: 20,
		height: 20,
	},
	medium: {
		width: 24,
		height: 24,
		padding: 2,
		backgroundColor: 'white'
	}
};

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
  static shelfTypes=['none',]
  state= {
    selectType:false,
    selectedBooks:[],
    dialogOpen: false
  }
  handleDialogOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  };
  clearShelf = () => {
    let onUpdateBook = this.props.onUpdateBook;
    this.props.books.forEach(function(book){
      onUpdateBook(book,'none');
    });
    this.handleDialogClose();
  };

  turnOnSelectType = () => {
    if (!this.state.selectType) {
      console.log ('turn on selectType')
      this.setState({selectType:true})
    }
  }
  turnOffSelectType =()=> {
    if (this.state.selectType){
      console.log('turn off selectType')
      this.setState({selectType:false, selectedBooks:[]})
    }
  }
  selectBook =(book)=>{
    if (this.state.selectType){
      console.log ('selectbook')
      this.setState(state=>({
        selectedBooks:state.selectedBooks.filter(a=>a.id!==book.id).concat([book])
      }))
    }
  }
  selectAllbook=()=> this.setState({selectedBooks:this.props.books})
  deselectAllBooks=()=>this.setState({selectedBooks:[]})
  deselectBook=(book)=>{
    if (this.state.selectType){
      console.log('unselectbook')
      this.setState(state=>({
        selectedBooks:state.selectedBooks.filter(a=>a.id!==book.id)
      }))
    }
  }
  updateBook=(e,index,value)=>{
    let onUpdateBook=this.props.onUpdateBook
    let selectedBooks=this.state.selectedBooks
    this.setState({selectType:false,selectBook: []})
    selectedBooks.forEach(function(book) {
      onUpdateBook(book,value)
    })
  }
  render(){
    const {books, onUpdateBook} = this.props;
    const dialogActions = [
      <FlatButton
        label="Cancel"
        style={styles.button}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Confirm"
        backgroundColor="#FF9584"
				hoverColor="#FF583D"
				style={styles.button}
        onClick={this.clearShelf}
      />,
    ];
    return(
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={getShelfTypeName(this.props.typeID)+ " ("+(this.props.books.length)+")"}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator/>
              <LoaderBox loading={this.props.loading} size={50} type="circle" className="loader-shelf-menu" />
              {!this.state.selectType && !this.props.loading && (books.length>0) &&
                <IconMenu
                  iconButtonElement={
                    <IconButton touch={true}>
                      <MoreVertIcon/>
                    </IconButton>
                  }
                >
                  <MenuItem primaryText="Move books" onClick={this.turnOnSelectType}/>
                  <MenuItem primaryText="Clear shelf" onClick={this.handleDialogOpen}/>

                </IconMenu>
              }
              {this.state.selectType &&
                <IconButton touch={true} onClick={this.turnOffSelectType}>
                  <NavigationClose />
                </IconButton>
              }
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          title={"Confirm clear shelf action"}
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
        >
          Do you really want to clear all book from "{getShelfTypeName(this.props.typeID)}" shelf?
        </Dialog>

        <div className="shelf-loader-box">
					<LoaderBox loading={this.props.loading} size={70} message="Loading Books" />
				</div>

        <ol>
          <CSSTransitionGroup
            transitionName='book-select-mode'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.selectType &&
            <div>
              <div className='select-mode-controls'>
                <RaisedButton
                  label='Select All'
                  primary={true}
                  style={styles.button}
                  disabled={(this.state.selectedBooks.length===this.props.books.length) ? true : false}
                  onClick={this.selectAllbook}
                />
                <RaisedButton
                  label='Clear All'
                  secondary={true}
                  style={styles.button}
                  disabled={(this.state.selectedBooks.length===0)?true:false}
                  onClick={this.deselectAllBooks}
                />
              </div>
              <div className="select-mode-controls">
                <CSSTransitionGroup
                  transitionName='book-select-box-move'
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                  >
                  {(this.state.selectedBooks.length>0)&&
                  <div>
                    <SelectField
                      floatingLabelText={'Move '+(this.state.selectedBooks.length>1?'Books':'Book')+ " to"}
                      value={this.state.value}
                      onChange={this.updateBook}>
                      {SHELF_TYPE_IDS.filter(shelf => shelf !== this.props.typeID).map((shelf) => (
												<MenuItem key={shelf}
														  value={shelf} primaryText={getShelfTypeName(shelf)}/>
											))}
											<MenuItem key="none"
													  value="none" primaryText="None" />
                    </SelectField>
                  </div>}
                </CSSTransitionGroup>
              </div>
            </div>}
          </CSSTransitionGroup>
          { (books.length===0) && !(this.props.loading) &&
            <div className="shelf-message-text">
              No books available
            </div>
          }
          <CSSTransitionGroup
    					transitionName="book-transition"
    					className="books-grid"
    					transitionEnterTimeout={500}
    					transitionLeaveTimeout={300}>
            {books.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <Loader
                      show={('loading' in book)? book.loading : false}
                      message={<span><img src={DotsLoader} width="50" alt=""/><div>Loading</div></span>}>
                      <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                      </div>
                    </Loader>
                    <div className="book-select-box">
											<CSSTransitionGroup
												transitionName="book-transition"
												transitionEnterTimeout={500}
												transitionLeaveTimeout={500}>
												{this.state.selectType && <Checkbox
													style={styles.checkbox}
													checked={(this.state.selectedBooks.filter(b => b.id === book.id).length > 0) ? true : false}
													onCheck={(event, isInputChecked) => {
														if (isInputChecked) {
															this.selectBook(book);
														}
														else {
															this.deselectBook(book);
														}
														this.setState({updating: true})
													}}
												/>}
                      </CSSTransitionGroup>
                    </div>
                    <CSSTransitionGroup
											transitionName="book-transition"
											transitionEnterTimeout={500}
											transitionLeaveTimeout={500}>
											{!this.state.selectType && !(('updating' in book) ? book.updating : false) &&
                      <div>
												<div className="book-shelf-changer">
													<IconMenu
                              value={this.state.value}
														  onChange={(event, value) => {
															onUpdateBook(book, value);
														}}
														iconButtonElement={<FloatingActionButton mini={true}>
															<NavigationExpandMoreIcon />
														</FloatingActionButton>}
													>
														<MenuItem primaryText="Move to..." disabled={true} />
														<Divider />
														{SHELF_TYPE_IDS.filter(shelf => shelf !== this.props.typeID).map((shelf) => (
															<MenuItem key={shelf}
																	  value={shelf} primaryText={getShelfTypeName(shelf)} />
														))}
														<MenuItem key="none"
																  value="none" primaryText="None" />
													</IconMenu>
												</div>
											</div>
											}
										</CSSTransitionGroup>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">
										{('authors' in book) ? book.authors.join(', ') : ''}
                  </div>
                </div>
              </li>
            ))}
          </CSSTransitionGroup>
        </ol>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  typeID: PropTypes.oneOf(SHELF_TYPE_IDS),
  onUpdateBook: PropTypes.func.isRequired,
  loading:PropTypes.bool
}

export default Bookshelf;
