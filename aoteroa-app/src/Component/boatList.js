import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ShowDetailModal from './Modal/showDetailModal';
import DeleteModal from './Modal/DeleteModal';
import Modal from './Modal/Modal';
import axios from 'axios';
import {connect} from 'react-redux';

//get the state from the redux store
@connect(
  (state)=>({
    boatList:state.boatList,
  })
)
export default class BoatList extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      boats: [],
    };
  }
  showModel(){
    console.log("clicked");
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/boats/`)
      .then(res => {
        const resData = res.data;
        this.setState({ boats:resData });
      });
  }

    render(){
      const boatList = this.props.boatList;//data set
      let tempList = boatList;//create a temp value to store all the list

      return (
        <div>
          <Modal
            buttonText = 'Add '
            title='Add Boat'
            headerText='Please fill the form for registering the new boat.'
          />
          <Grid container spacing={16}>
            {
              tempList.map(element => (
                <Grid item key={"boat_Grid_"+element.id}>
                  <Card style={{
                    maxWidth: 345
                  }}>
                    <CardMedia
                      style={{
                        height: 0,
                        paddingTop: '56.25%', // 16:9
                      }}
                      image={element.photo}
                      title={element.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {element.name}
                      </Typography>
                      <Typography component="p">
                        <span>by: {element.work_description}</span>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ShowDetailModal data = {element}/>

                      <DeleteModal Header={"Are you sure you want to Delete "+element.name+" ?"}
                        label = "Delete"
                        title = "Delete Record"
                        id={element.id}
                      />
                      <Modal
                        data ={element}
                        buttonText = 'Edit '
                        title='Edit Boat'
                        headerText='Please change the field data that you want to edit.'
                        id={element.id}

                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
            </Grid>
        </div>
      );
    }

}
