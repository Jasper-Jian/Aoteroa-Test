import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';

import {addBoat,editBoat} from '../../actions/boatAction';
//0, because the biggest reducer id is -1;
let nextBoatId = 0;
//get the state from the redux store
@connect(
  (state)=>({
    boatList:state.boatList,
  })
)
export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boat: this.props.data
    };
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
  addBoat = (e) => {
    e.preventDefault()
    if(this.props.id !== this.props.boatList.id){
      const data = Object.assign({}, this.props.data);
      this.props.dispatch(editBoat({
          id: this.props.id,
          name: this.state.name ? this.state.name : data.name,
          type: this.state.type ? this.state.type : data.type,
          photo: this.state.photo ? this.state.photo : data.photo,
          length: this.state.length ? this.state.length : data.length,
          work_description: this.state.work_description ? this.state.work_description : data.work_description,
          arrival_date: this.state.arrival_date ? this.state.arrival_date : data.arrival_date,
          delivery_date: this.state.delivery_date ? this.state.delivery_date : data.delivery_date,
          status: this.state.status ? this.state.status : data.status,
          action_type: 'EDIT_BOAT',
      }))
    }else{
      this.props.dispatch(addBoat({
          id: nextBoatId++,
          name: this.state.name,
          type: this.state.type,
          photo: this.state.photo,
          length: this.state.length,
          work_description: this.state.work_description,
          arrival_date: this.state.arrival_date,
          delivery_date: this.state.delivery_date,
          status: this.state.status,
          action_type: 'ADD_BOAT'
      }))
    }
    //Todo: Add Redux Setup Or Post Request
    this.setState({ open: false });
}
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const boatList = this.props.boatList;//data set
    const boat = Object.assign({}, this.props.data);
    return (
      <div>
        <Button onClick={this.handleClickOpen}
        size="small" color="primary"> {this.props.buttonText}
        </Button>
        <Dialog
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
            <Grid item>
              <TextField
                fullWidth
                label="Boat Name"
                defaultValue={boat.name}
                onChange={e => this.setState({name: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.type}
                label="Type"
                onChange={e => this.setState({type: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.photo}
                label="Photo Link"
                onChange={e => this.setState({photo: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.length}
                label="Length"
                onChange={e => this.setState({length: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.work_description}
                label="Work Description"
                onChange={e => this.setState({work_description: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.arrival_date}
                label="Arrival Date"
                onChange={e => this.setState({arrival_date: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.delivery_date}
                label="Delivery Date"
                onChange={e => this.setState({delivery_date: e.target.value ? e.target.value : null})}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                fullWidth
                defaultValue={boat.status}
                label="Status"
                onChange={e => this.setState({status: e.target.value ? e.target.value : null})}
              />
            </Grid>


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addBoat} color="primary">
              Confirm
            </Button>
          </DialogActions>
            </Dialog>
      </div>
    );
  }
}
