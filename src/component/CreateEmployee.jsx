import React, { Component } from 'react'
import EmployeeService from '../service/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            id: this.props.match.params.id,
            empName: '',
            empSalary: '',
            empDesignation: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }


    componentDidMount() {


        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    empName: employee.empName,
                    empSalary: employee.empSalary,
                    empDesignation: employee.empDesignation
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { empName: this.state.empName, empSalary: this.state.empSalary, empDesignation: this.state.empDesignation };
        console.log('employee => ' + JSON.stringify(employee));


        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ empName: event.target.value });
    }

    changeSalaryHandler = (event) => {
        this.setState({ empSalary: event.target.value });
    }

    changeDesignationHandler = (event) => {
        this.setState({ empDesignation: event.target.value });
    }


    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }


    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Name: </label>
                                        <input placeholder="Name" name="empName" className="form-control"
                                            value={this.state.empName} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Salary: </label>
                                        <input placeholder="Salary" name="empSalary" className="form-control"
                                            value={this.state.empSalary} onChange={this.changeSalaryHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Designation: </label>
                                        <input placeholder="Designation" name="empDesignation" className="form-control"
                                            value={this.state.empDesignation} onChange={this.changeDesignationHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-info" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent