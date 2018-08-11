import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import axios from 'axios';
import ListItem from './ListItem'

class showDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      numberOfWorkerOnBoat:0,
      workName:[]
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount(){
    axios.get(`http://localhost:3000/workers`)
      .then(res => {
        const resData = res.data;
        let workerName = [];
        resData.map(e=>{
          if(e.boatIds.includes(this.props.data.id)){
            workerName.push(e);
            let count = this.state.numberOfWorkerOnBoat;
            this.setState({
              numberOfWorkerOnBoat: ++count ,
              workName: workerName
             });
          }
        });
        this.setState({ worker:resData });
      });

  }
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen} size="small" color="primary"> Details
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.props.data.name} Details
          </DialogTitle>
          <DialogContent>
            <ListItem title = 'Name' Detail = {this.props.data.name} />
            <ListItem title = 'Type' Detail = {this.props.data.type} />
                <ListItem title = 'Length' Detail = {this.props.data.length} />
                <ListItem title = 'Work Description' Detail = {this.props.data.work_description} />
                <ListItem title = 'Arrival Date' Detail = {this.props.data.arrival_date} />
                <ListItem title = 'Delivery Date' Detail = {this.props.data.delivery_date} />
                <ListItem title = 'Status' Detail = {this.props.data.status} />
                <ListItem title = 'Number of Worker' Detail = {this.state.numberOfWorkerOnBoat} />
                <ListItem title = 'Worker' Detail = {this.state.workName.map(e=>e.name+" , ")}/>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
      </div>
    );
  }
}

showDetailModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(showDetailModal);
