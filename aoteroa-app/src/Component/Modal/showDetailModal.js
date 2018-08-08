import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
class showDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      worker: null,
      numberOfWorkerOnBoat:0
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
        resData.map(e=>{
          if(e.boatIds.includes(this.props.data.id)){
            this.setState({ numberOfWorkerOnBoat: ++this.state.numberOfWorkerOnBoat });
          }
        });
        this.setState({ worker:resData });
      });

  }
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
            <Button onClick={this.handleClickOpen}> Details
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

                  <List component="nav">

                    <ListItem button>
                      <ListItemText>
                        Name: {this.props.data.name}
                      </ListItemText>
                    </ListItem>
                   <Divider />

                   <ListItem button>
                     <ListItemText>
                       Type: {this.props.data.type}
                     </ListItemText>
                   </ListItem>
                   <Divider />

                   <ListItem button>
                     <ListItemText>
                      Length: {this.props.data.length}
                     </ListItemText>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemText>
                      Work Description: {this.props.data.work_description}
                     </ListItemText>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemText>
                       Arrival Date: {this.props.data.arrival_date}
                     </ListItemText>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemText>
                  Delivery Date: {this.props.data.delivery_date}
                     </ListItemText>
                  </ListItem>
                    <ListItem button>
                       <ListItemText>
                         Status: {this.props.data.status}
                       </ListItemText>
                    </ListItem>
                    <ListItem button>
                     <ListItemText>
                      Number of Worker: {this.state.numberOfWorkerOnBoat}
                     </ListItemText>
                   </ListItem>
                   <Divider />
                 </List>

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
