import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {addBoat,editBoat,assignWorker} from '../../actions/boatAction';
//0, because the biggest reducer id is -1;
let nextBoatId = 0;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
//get the state from the redux store
@connect(
  (state)=>({
    boatList:state.boatList,
    workerList:state.workerList
  })
)

export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boat: this.props.data,
      worker_name: [],
      selected:[]
    };
  }

  componentDidMount(){
    // if(this.props.id){
    //   axios.get(`http://localhost:3000/boats/`+this.props.id)
    //     .then(res => {
    //       const resData = res.data;
    //       this.setState({ boats:resData });
    //     });
    // }

    const boat = Object.assign({}, this.props.data);
    axios.get(`http://localhost:3000/workers`)
      .then(res => {
        const resData = res.data;
        let workerName = [];
        this.setState({worker_name:resData});
        resData.map(e=>{
          if(e.boatIds.includes(boat.id)){
            workerName.push(e);
            this.setState({
              selected: workerName
             });
          }
        });
        console.log(this.state.worker_name);
        this.setState({ worker_name:resData });
      })
  };
  handleChange = event => {
    console.log(event.target.value);
    const storeValue = this.state.worker_name;
    console.log("storeValue",storeValue);
    this.setState({ selected: storeValue });
    console.log("selected",this.state.selected);
    console.log("worker name",this.state.worker_name);
    this.props.dispatch(assignWorker({
      id: this.state.worker_name,
      name:  this.state.worker_name,
      phone:  this.state.worker_name,
      photo:  this.state.worker_name,
      boatIds:  this.state.worker_name
    }))

  };

  menuItems(values) {
   return this.state.worker_name.map((name) => (
     <MenuItem
       key={name}
       insetChildren={true}
       checked={values && values.indexOf(name) > -1}
       value={name}
       primaryText={name}
     />
   ));
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
          action_type: 'EDIT_BOAT'
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
            <br />
            <Grid item>
              <InputLabel htmlFor="select-multiple-chip">Assign Worker</InputLabel>
              <Select
                multiple
                value={this.state.selected.map(e=>e.name)}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {
                  this.state.worker_name.map(e => (
                    <MenuItem
                      key={e.id}
                      value={e.name}
                    >
                      {e.name}
                    </MenuItem>
                  ))
                }
              </Select>

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
