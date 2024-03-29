import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DepartmentView = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            fetchEmployeesByDepartment(selectedDepartment);
        }
    }, [selectedDepartment]);

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/departments-view`);
            setDepartments(res.data);
            if (res.data.length > 0) {
                setSelectedDepartment(res.data[0].dept_name);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchEmployeesByDepartment = async (dept_name) => {
        try {
            const res = await axios.get(`http://localhost:8800/employees/view/${dept_name}`);
            setEmployees(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <img src={process.env.PUBLIC_URL + '/LOGO.jpg'} alt="Logo" className='logo'/>
                <div className="botton-nav">
                <Link to="/" className="main-nav">
                    EMPLOYEES
                </Link>
                <Link to="/view" className="main-nav">
                    VIEW BY DEPARTMENT
                </Link>
                <Link to="/leaves" className="main-nav">
                    VIEW BY LEAVES
                </Link>
                <Link to="/superior" className="main-nav">
                    VIEW SUPERIOR
                </Link>
                </div>
            </div>
            <div className='main-content'>
                <div className="header-container">
                    <h1 className="header-left">DEPARTMENTS</h1>
                    <select className="department-select" value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                        {departments.map((department, index) => (
                            <option key={index} value={department.dept_name}>{department.dept_name}</option>
                        ))}
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Status</th>
                            <th>Employee Type</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.lastname}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.dept_name}</td>
                                <td>{employee.designation_name}</td>
                                <td>{employee.status_name}</td>
                                <td>{employee.employee_type}</td>
                                <td className="button-container"> 
                                    <Link to={`/update/${employee.employee_id}`} className="action-btn">UPDATE</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bottom-nav-dep">
                    <Link to="/" className="add-btn">
                        <h1><b>BACK</b></h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DepartmentView;