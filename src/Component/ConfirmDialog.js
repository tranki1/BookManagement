import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import '../App.css';

const styles = {
  button: {
		marginRight: 12,
	}
}

function ConfirmDialog (props){

  const dialogActions = [
    <FlatButton
      label="Cancel"
      style={styles.button}
      onClick={props.onCancel}
    />,
    <FlatButton
      label="Confirm"
      backgroundColor="#FF9584"
      hoverColor="#FF583D"
      style={styles.button}
      onClick={props.onConfirm}
    />,
  ];
  return(
    <Dialog
      title={"Confirm clear shelf action"}
      actions={dialogActions}
      modal={true}
      open={props.open}
    >
      {props.message}
    </Dialog>
  )
}
ConfirmDialog.propTypes= {
  title: PropTypes.string.isRequired,
  message:PropTypes.string.isRequired,
  open:PropTypes.bool.isRequired,
  onCancel:PropTypes.func.isRequired,
  onConfirm:PropTypes.func.isRequired
}
export default ConfirmDialog;
