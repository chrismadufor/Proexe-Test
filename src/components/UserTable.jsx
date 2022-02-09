import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function UserTable() {
  const [showModal, setShowModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const users = useSelector((state) => state.users);

  const onDelete = (user) => {
    setDeleteUser(user);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setDeleteUser(null);
    setShowModal(false);
  };

  useEffect(() => {
    sessionStorage.setItem("users", JSON.stringify(users));
  });

  return (
    <div className="py-10 px-8 mt-10 mx-5 border overflow-auto rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-5 pb-5 px-5 border-b-2 border-gray-200">
        <h3 className="font-semibold text-2xl">Users List</h3>
        <div>
          <Link to="create">
            <button className="py-2 px-5 rounded-lg bg-blue-600 text-white font-medium uppercase tracking-wider">
              Create User
            </button>
          </Link>
        </div>
      </div>
      {users.length === 0 ? (
        <p className="font-semibold text-lg m-5"> No users in the database </p>
      ) : (
        <table className="w-full border-2 border-gray-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-24 p-4 text-sm font-semibold tracking-wide text-center">
                User ID
              </th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">
                Username
              </th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">
                City
              </th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="w-32 p-4 text-sm font-semibold tracking-wide text-center">
                Edit
              </th>
              <th className="w-32 p-4 text-sm font-semibold tracking-wide text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b-2 border-gray-200">
                <td className="whitespace-nowrap p-4 text-sm text-gray-700 text-center">
                  {user.id}
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                  {user.name ? user.name : "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                  {user.username ? user.username : "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                  {user.address ? user.address.city : "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                  {user.email ? user.email : "-"}
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700 text-center">
                  <Link to={"update/" + user.id}>
                    <button className="py-1.5 px-4 rounded-md bg-blue-600 text-white uppercase tracking-wider">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="whitespace-nowrap p-4 text-sm text-gray-700 text-center">
                  <button
                    className="py-1.5 px-4 rounded-md bg-red-500 text-white uppercase tracking-wider"
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal ? (
        <DeleteConfirmationModal onClose={onCloseModal} user={deleteUser} />
      ) : null}
    </div>
  );
}

export default UserTable;
