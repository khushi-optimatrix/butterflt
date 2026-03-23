import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import Header from './Header.jsx'
import axios from 'axios';

function Useradmin() {
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [editUser, seteditUser] = useState(null);


  const [page, setPage] =  useState({ page: "List", id: "" }); // fixed typo

  const { register, handleSubmit, reset, formState: { errors },setValue  } = useForm();

  const fetchUsers = async (id) => {
    try {
      const res = id?await axios.get(`http://localhost:5000/api/users/${id}`):await axios.get('http://localhost:5000/api/users');
      id?seteditUser(res.data):setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    if(page.id){
      fetchUsers(page.id);
    }else{
    fetchUsers();

    }
  }, [page.id]);
  useEffect(() => {
    if(editUser){
      setValue("name", editUser.name);
      setValue("email", editUser.email);
      setValue("role", editUser.role);
      setValue("username", editUser.username);
      setValue("password", editUser.password);
    }
  }, [editUser, setValue]);


  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: Number(data.role) };
      data.id ? await axios.put(`http://localhost:5000/api/users/${data.id}`, payload) :
      await axios.post('http://localhost:5000/api/users', payload);
      setSuccess('Form submitted successfully!');
      reset();
      fetchUsers(); // refresh table
      setPage({ page: "List", id: "" }); // go back to list
    } catch (err) {
      console.error('Axios error:', err.response ? err.response.data : err.message);
      setSuccess('Error submitting form');
    }
  };
  const userDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setSuccess("User deleted successfully!");
    fetchUsers(); // refresh table
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    setSuccess("Error deleting user");
  }
};
  return (
    <>
    <Header/>
    
    <div className='rightpage'>
    {page.page === "List" && (
  
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
        <button onClick={()=>{setPage({ page: "List", id: "" });}} className={page.page === "List" ? "active" : ""}>List</button>
        {page.id=='' && <button onClick={()=>{setPage({ page: "Add", id: "" });}} className={page.page === "Add" ? "active" : ""}>Add</button>}
        {page.id && <button onClick={()=>{setPage({ page: "Edit", id: page.id });}} className={page.page === "Edit" ? "active" : ""}>Edit</button>}


    </div>
    {page.page === "List" && <div className='tablebox'>
  <table className="custom-table">
    <thead>
      <tr>
        <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>User Name</th>
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
            <td>{user.username}</td>

            <td>
                <button className="edit-btn" onClick={()=>{setPage({ page: "Edit", id: user._id });}}>Edit</button>
                <button className="delete-btn" onClick={()=>userDelete(user._id)}>Delete</button>
            </td>
            </tr>
        ))}
    </tbody>
  </table>
</div>}
    {(page.page === "Add" || page.page === "Edit")  && <div className='addeditbox'>
      
    <div className='form-top'>
        <h2 className="form-title">{page.page} User</h2>
        <button onClick={()=>reset()} className="reset-btn">Reset</button>
    </div>
  {success && <p id="success-message">{success}</p>}
  <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
    <input type="hidden"  name='id' {...register("id")} value={page.id}  />

    <div className="form-group">
      <label>Name</label>
      <input type="text" placeholder="Enter name" {...register("name", { required: "Name is required" })}  />
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
        }, })}   />
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

    <div className="form-group">
      <label>User Name</label>
      <input type="text" placeholder="Enter user name" {...register("username", { required: "User Name is required" })} />
      {errors.username && <p>{errors.username.message}</p>}
    </div>

    <div className="form-group">
      <label>Password</label>
      <input type="password" placeholder="Enter password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p>{errors.password.message}</p>}
    </div>

    <div className="form-actions">
      <button type="submit" className="save-btn">Save</button>
      <button type="button" className="cancel-btn" onClick={()=>{setPage({ page: "List", id: "" });}}>Cancel</button>
    </div>
  </form>
  
</div>}     
    
    </div>
    

    </>
  )
}

export default Useradmin
