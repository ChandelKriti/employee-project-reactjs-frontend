import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EmployeeList from './component/EmployeeList';
import CreateEmployee from './component/CreateEmployee';


class App extends Component {
  render() {
    return (
      <div>
        <Router>   
      <div className="container">
        <Switch>
        <Route path = "/" exact component = {EmployeeList}></Route>
                          <Route path = "/employees" component = {EmployeeList}></Route>
                          <Route path = "/add-employee/:id" component = {CreateEmployee}></Route>
                         
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
        </Switch>
      </div>
      </Router>
      </div>
    );
  }
}

export default App;