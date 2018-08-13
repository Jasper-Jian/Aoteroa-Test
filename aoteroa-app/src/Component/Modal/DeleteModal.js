import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {connect} from 'react-redux';
import {deleteBoat} from '../../actions/boatAction';
let nextBoatId = 0;
@connect(
  (state)=>({
    boatList:state.boatList,
  })
)
export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  deleteBoat = () => {
    this.props.dispatch(deleteBoat({
        id: this.props.id,
        type: 'DELETE_BOAT',
    }))
    //Todo: delete Redux Setup Or Post Request
    this.setState({ open: !this.state.open });
  };

  render() {

    return (
      <div>
        <Button onClick={this.handleClickOpen}
        size="small" color="primary"> {this.props.label}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby={this.props.label}
        >

          <DialogTitle id="alert-dialog-slide-title">{this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.Header} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteBoat} color="primary" autoFocus>
              Delete
                  </Button>
                </DialogActions>
            </Dialog>
      </div>
    );
  }
}
