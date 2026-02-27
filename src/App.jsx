import React, { useEffect, useState } from 'react';
import './App.css';
import { APIURL, IMGURL, callApi } from './lib';

const App = () => {
    const [usersData, setUsersData] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [editData, setEditData] = useState({ _id: "", firstname: "", Lastname: "", mobile: "", email: "" });

    useEffect(() => {
        callApi("GET", APIURL + "users/getAllUsers", "", loadUsers);
    }, []);

    function loadUsers(res) {
        setUsersData(res);
    }
    function deleteUser(_id) {
        const ack = confirm("Are you sure to delete this user?");
        if (!ack)
            return;
        callApi("DELETE", APIURL + "users/deleteUser/" + _id, "", deleteResponse)
    }
    function deleteResponse(res) {
        alert(res.msg);
        callApi("GET", APIURL + "users/getAllUsers", "", loadUsers);
    }
    function editUser(index) {
        setEditData(usersData[index]);
        setisEdit(true);
    }
    function cancelEdit() {
        setisEdit(false);
    }
    function handleEditChange(e) {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    }
    function saveUser() {
        if (editData._id) {
            callApi("PUT", APIURL + "users/updateUser", JSON.stringify(editData), editResponse);
        } else {
            callApi("POST", APIURL + "users/addUser", JSON.stringify(editData), editResponse);
        }
    }
    function editResponse(res) {
        alert(res.msg);
        setisEdit(false);
        callApi("GET", APIURL + "users/getAllUsers", "", loadUsers);
    }
    function addNew() {
        setisEdit(true);
        setEditData({ _id: "", firstname: "", Lastname: "", mobile: "", email: "" });
    }

    return (
        <div className='app'>
            <div className='header'>User Management</div>
            <div className='section'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ 'width': '50px' }}>S.NO</th>
                            <th style={{ 'width': '150px' }}>First Name</th>
                            <th style={{ 'width': '150px' }}>Last Name</th>
                            <th style={{ 'width': '100px' }}>Mobile#</th>
                            <th style={{ 'width': '250px' }}>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr key={user._id}>
                                <td style={{ "textAlign": "center" }}>{index + 1}</td>
                                <td>{user.firstname}</td>
                                <td>{user.Lastname}</td>
                                <td>{user.mobile}</td>
                                <td>{user.email}</td>
                                <td>
                                    <img src={IMGURL + "edit.png"} alt='' onClick={() => editUser(index)} />
                                    <img src={IMGURL + "bin.png"} alt='' onClick={() => deleteUser(user._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='footer'>
                <button onClick={() => addNew()}>Add new</button>
                <span>Copyright @ 2026</span>
            </div>

            {isEdit &&
                <div className='popup'>
                    <div className='popup-content'>
                        <div className='popup-header'>
                            <span>{editData._id ? "Edit User information" : "Add NewUser"}</span>
                            <span style={{ cursor: 'pointer' }} onClick={cancelEdit}>X</span>
                        </div>
                        <div className='popup-body'>
                            <div className='form-group'>
                                <label>First Name</label>
                                <input name="firstname" value={editData.firstname} onChange={handleEditChange} />
                            </div>
                            <div className='form-group'>
                                <label>Last Name</label>
                                <input name="Lastname" value={editData.Lastname} onChange={handleEditChange} />
                            </div>
                            <div className='form-group'>
                                <label>Mobile#</label>
                                <input name="mobile" value={editData.mobile} onChange={handleEditChange} />
                            </div>
                            <div className='form-group'>
                                <label>Email</label>
                                <input name="email" value={editData.email} onChange={handleEditChange} />
                            </div>
                        </div>
                        <div className='popup-footer'>
                            <button onClick={saveUser}>{editData._id ? "Update" : "Save"}</button>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;