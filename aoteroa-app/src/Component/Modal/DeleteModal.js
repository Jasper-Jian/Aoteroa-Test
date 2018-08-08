import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import withMobileDialog from '@material-ui/core/withMobileDialog';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class DeleteModal extends React.Component {
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
    alert("Boat Deleted ");
    console.log(this.state);
    //Todo: delete Redux Setup Or Post Request
    this.setState({ open: !this.state.open });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
            <Button onClick={this.handleClickOpen}
              size="small" color="primary"> {this.props.label}
            </Button>
            <Dialog
              fullScreen={fullScreen}
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

DeleteModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});
export default withStyles(styles)(DeleteModal);
