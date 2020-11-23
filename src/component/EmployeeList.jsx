import React, { Component } from 'react'
import EmployeeService from '../service/EmployeeService'


class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            message: null
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-info" onClick={this.addEmployee}> Add Employee</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Designation</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.empName}</td>
                                            <td>{employee.empSalary}</td>
                                            <td>{employee.empDesignation}</td>

                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-success">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>

                                            </td>
                                            
                                        </tr>

                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default EmployeeList;

