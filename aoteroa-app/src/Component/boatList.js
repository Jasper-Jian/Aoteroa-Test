import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ShowDetailModal from './Modal/showDetailModal'
import axios from 'axios';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
};
class BoatList extends Component
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
      const { classes } = this.props;
      return (
        <div>
          <Grid container spacing={16}>
            {
              this.state.boats.map(element => (
                <Grid item>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
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

                      <Button size="small" color="primary">
                        Remove
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
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
BoatList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BoatList);
