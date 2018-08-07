import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/SimpleAction';
import BoatList from './Component/boatList';


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
      <BoatList />
   </div>
  );
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
