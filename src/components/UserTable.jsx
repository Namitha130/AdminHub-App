import React from "react";
import { useState } from "react";

const UserTable = ({ users, onEdit, onDelete ,onCheckboxClick, selectedUserIds, currentPage, pageSize   }) => {
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserMail, setEditedUserMail] = useState("");
  const [editedUserRole, setEditedUserRole] = useState("");

  const handleEditClick = (userId) => {
    setEditableUserId(userId);
  };

  const handleSaveClick = (userId) => {
    onEdit({
      id: userId,
      name: editedUserName,
      email: editedUserMail,
      role: editedUserRole,
    });
    setEditableUserId(null);
  };

  const handleDeleteClick = (userId) => {
    onDelete(userId);
  };

  const handleCheckboxChange = (event , userId) => {
    const isChecked = event.target.checked;
    onCheckboxClick(userId, isChecked);
    
  };

  return (
    <div id="userTable">
      <table>
        <thead>
          <tr>
            <th>       
              <input type="checkbox" 
                   onChange={handleCheckboxChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={selectedUserIds.includes(user.id) ? "selectedRow" : ""}>
              <td>
                <input type="checkbox" 
                 checked={selectedUserIds.includes(user.id)}
                 onChange={(e) => handleCheckboxChange(e, user.id)} 
                 />
              </td>

              <td>
                {editableUserId === user.id ? (
                  <input 
                    className="editInput"
                    type="text"
                    value={editedUserName}
                    onChange={(e) => setEditedUserName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editableUserId === user.id ? (
                  <input
                    type="text"
                    className="editInput"
                    value={editedUserMail}
                    onChange={(e) => setEditedUserMail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editableUserId === user.id ? (
                  <input
                    type="text"
                    className="editInput"
                    value={editedUserRole}
                    onChange={(e) => setEditedUserRole(e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </td>

              <td>
                {editableUserId === user.id ? (
                  <button onClick={() => handleSaveClick(user.id)} id="save" style={{color : "green" }}>
                    <i class="bx bx-save"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(user.id, user.name)}
                    id="edit"
                  >
                    <i class="bx bx-edit"></i>
                  </button>
                )}
                <button onClick={() => handleDeleteClick(user.id)} id="delete">
                  <i class="bx bx-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
