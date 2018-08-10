import React, { Component } from 'react';
import './App.css';
// import { simpleAction } from './actions/SimpleAction';
import BoatList from './Component/boatList';
import Grid from '@material-ui/core/Grid';

class App extends Component {

 render() {
  return (
   <div className="App">
     <p>List of Boat</p>

     <Grid container spacing={0}>
       <Grid item xs={1} sm={1} md={1} lg={1}>
       </Grid>
       <BoatList />
       <Grid item xs={1} sm={1} md={1} lg={1}>
       </Grid>
     </Grid>
   </div>
  );
 }
}
export default App;
