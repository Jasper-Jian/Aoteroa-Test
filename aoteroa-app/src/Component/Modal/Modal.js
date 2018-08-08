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

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  componentDidMount(){
    if(this.props.id){
      axios.get(`http://localhost:3000/boats/`+this.props.id)
        .then(res => {
          const resData = res.data;
          this.setState({ boats:resData });
        });
    }
  }
  addBoat = () => {
    alert(!this.state.name?"Boat added "+this.state.name:"Nothing added");
    console.log(this.state);
    //Todo: Add Redux Setup Or Post Request
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
            <Button onClick={this.handleClickOpen}
              size="small" color="primary"> {this.props.buttonText}
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="Add_Boat"
              >

              <DialogTitle id="alert-dialog-slide-title">
                {this.props.title}
              </DialogTitle>
              <DialogContent id="alert-dialog-slide-description">
                {this.props.headerText}
                <br />
                  <Grid item xs={20} lg={20}>
                    <TextField fullWidth='true'
                      label="Boat Name"
                      value={this.props.data === undefined ? '': this.props.data.name}
                      onChange={e => this.setState({name: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      label="Type"
                      value={this.props.data === undefined ? '': this.props.data.type}
                      onChange={e => this.setState({type: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      label="Photo Link"
                      value={this.props.data === undefined ? '': this.props.data.photo}
                      onChange={e => this.setState({photo: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      multiline
                      label="Length"
                      value={this.props.data === undefined ? '': this.props.data.length}
                      onChange={e => this.setState({length: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      multiline
                      label="Work Description"
                      value={this.props.data === undefined ? '': this.props.data.work_description}
                      onChange={e => this.setState({work_description: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      multiline
                      label="Arrival Date"
                      value={this.props.data === undefined ? '': this.props.data.arrival_date}
                      onChange={e => this.setState({arrival_date: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      multiline
                      label="Delivery Date"
                      value={this.props.data === undefined ? '': this.props.data.delivery_date}
                      onChange={e => this.setState({delivery_date: e.target.value ? e.target.value : null})}
                    />
                  </Grid>
                  <Grid item >
                    <TextField fullWidth='true'
                      multiline
                      label="Status"
                      value={this.props.data === undefined ? '': this.props.data.status}
                      onChange={e => this.setState({status: e.target.value ? e.target.value : null})}
                    />
                  </Grid>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.addBoat} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
      </div>
    );
  }
}

Model.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});
export default withStyles(styles)(Model);
