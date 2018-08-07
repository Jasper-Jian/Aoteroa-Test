import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from 'axios'; 

class BoatList extends Component 
{
  constructor(props) {

    super(props);

    this.state = {

      boats: []

    };

  }

  componentDidMount() {

    axios.get(`http://localhost:3000/boats/`)
      .then(res => {
        const resData = res.data;
        this.setState({ boats:resData });

      });

  }

    render(){
      return (
        <div>
          <GridList cellHeight={180}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>
          
           {
              this.state.boats.map(element => (
                <GridListTile key= {element.id}>
                  <img src={element.photo} alt={element.title} />
                  <GridListTileBar
                    title={element.name}
                    subtitle={<span>by: {element.work_description}</span>}
                    
                  />
                </GridListTile>
              ))            
            }
          </GridList>
        </div>
      );
    }
    
}
export default BoatList;