import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // states used for pagination
  const [usersPerPage] = useState(10);
  const [isDeletebtnActive, setIsDeletebtnActive] = useState(false); // states used for searchinput

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  //! Implementing search functionality
  const handleSearchTerm = (word) => {
    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(word.toLowerCase()) ||
        user.email.toLowerCase().includes(word.toLowerCase()) ||
        user.role.toLowerCase().includes(word.toLowerCase())
    );
    setUsers(filteredData);
    setCurrentPage(1);
  };

  //! Implementing edit user details
  const handleEdit = (e) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === e.id ? e : user))
    );
  };
  //! Implementing delete user details
  const handleDelete = (e) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== e)
    );
  };

// ! impleting for checkBox onclick and Onchange funtions
  const handleCheckboxClick = (userId, isChecked) => {
    setIsDeletebtnActive(isChecked);
    setSelectedUserIds((prevSelectedUserIds) => {
      if (isChecked) {
        return [...prevSelectedUserIds, userId];
      } else {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
    });
  };


// ! implementing pagination 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleDeleteSelected = () => {
    for (const userId of selectedUserIds) {
      handleDelete(userId);
    }
    setSelectedUserIds([]);
  };
 
  return (
    <div>
      <SearchBar onSearch={handleSearchTerm} 
       isActive={isDeletebtnActive} 
       onDeleteSelected={handleDeleteSelected}/>
      <UserTable
        users={currentUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCheckboxClick={handleCheckboxClick}
        selectedUserIds={selectedUserIds}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminDashboard;
