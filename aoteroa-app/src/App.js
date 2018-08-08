import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/SimpleAction';
import BoatList from './Component/boatList';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
  ...state
 });
 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 });

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
   }
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
