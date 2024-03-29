import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8800/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:8800/employees/" + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
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
        <h1 className="header-left">EMPLOYEES</h1>
        <table>
          <thead>
            <tr>
              <th className='primary-key'>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td className='primary-key'>{employee.employee_id}</td>
                <td>
                  {`${employee.firstname} ${employee.middlename} ${employee.lastname}`}
                </td>
                <td>
                  {`${employee.addressline} ${employee.barangay} ${employee.province} ${employee.country} ${employee.zipcode}`}
                </td>
                <td className="button-container">
                <div className="action-btn" onClick={() => handleDelete(employee.employee_id)}>
                  DELETE
                </div>
                <Link to={`/update/${employee.employee_id}`} className="action-btn">
                  UPDATE
                </Link>
                <Link to={`/addLeaves/${employee.employee_id}`} className="action-btn">
                  LEAVE
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/add" className="add-btn">
          <h1><b>ADD</b></h1>
        </Link>
      </div>
    </div>
  );
};

export default Employees;