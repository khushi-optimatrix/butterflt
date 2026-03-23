import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import Header from './Header.jsx'
import axios from 'axios';

function Useradmin() {
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("List"); // fixed typo

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: Number(data.role) };
      await axios.post('http://localhost:5000/api/users', payload);
      setSuccess('Form submitted successfully!');
      reset();
      fetchUsers(); // refresh table
      setPage('List'); // go back to list
    } catch (err) {
      console.error('Axios error:', err.response ? err.response.data : err.message);
      setSuccess('Error submitting form');
    }
  };
  return (
    <>
    <Header/>
    
    <div className='rightpage'>
    {page === "List" && (
  
    <div className='searchbox'>
      <label htmlFor='search'>Search By:</label>
      <input
        type="text"
        placeholder='Search by name, email or role'
        className='searchinput'
      />
      <button>Search</button>
      <button>Reset</button>
    </div>
  
    )}
    <div className='pagesbox'>
        <button onClick={()=>{setPage('List');}} className={page === "List" ? "active" : ""}>List</button>
        <button onClick={()=>{setPage('Add');}} className={page === "Add" ? "active" : ""}>Add</button>

    </div>
    {page === "List" && <div className='tablebox'>
  <table className="custom-table">
    <thead>
      <tr>
        <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {users.map((user, index) => (
            <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <span className={`role ${user.role === 1 ? 'admin' : 'user'}`}>
                {user.role === 1 ? 'Admin' : 'User'}
                </span>
            </td>
            <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </td>
            </tr>
        ))}
    </tbody>
  </table>
</div>}
    {page === "Add" && <div className='addeditbox'>
    <div className='form-top'>
        <h2 className="form-title">Add User</h2>
        <button onClick={()=>reset()} className="reset-btn">Reset</button>
    </div>
  
  <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group">
      <label>Name</label>
      <input type="text" placeholder="Enter name" {...register("name", { required: "Name is required" })} />
      {errors.name && <p>{errors.name.message}</p>}
    </div>

    <div className="form-group">
      <label>Email</label>
      <input type="text" placeholder="Enter email" 
      {...register("email", { 
        required: "Email is required",
        pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email",
        }, })} />
      {errors.email && <p>{errors.email.message}</p>}
    </div>

    <div className="form-group">
      <label>Role</label>
      <select {...register("role", { required: "Role is required" })}>
        <option value="">Select role</option>
        <option value={1}>Admin</option>
        <option value={2}>User</option>
      </select>
        {errors.role && <p>{errors.role.message}</p>}
    </div>

    <div className="form-actions">
      <button type="submit" className="save-btn">Save</button>
      <button type="button" className="cancel-btn" onClick={()=>{setPage('List');}}>Cancel</button>
    </div>
  </form>
  {success && <p>{success}</p>}
</div>}     
    
    </div>
    

    </>
  )
}

export default Useradmin
