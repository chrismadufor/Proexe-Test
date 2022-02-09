import React from "react";
import { useDispatch } from "react-redux";
import UserService from "../services/userService";
import { deleteUser } from "../store/users";

function DeleteConfirmationModal({ onClose, user }) {
  const dispatch = useDispatch();

  //  The API throws a bad request error when you try to delete a user with an ID above 10 because it has just 10 objects. That is why I put the dispatch code in the catch block for a seamless experience

  const onDeleteUser = (id) => {
    console.log(id);
    UserService.deleteUser(id)
      .then((res) => {
        dispatch(deleteUser(id));
        onClose();
      })
      .catch((err) => {
        dispatch(deleteUser(id));
        onClose();
      });
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center py-12 px-5 rounded-lg shadow w-full max-w-xl relative bg-white">
        <button onClick={onClose} className="absolute right-4 top-4">
          X
        </button>
        <p className="text-center font-medium text-base mb-8">
          Are you sure you want to delete {user ? user.name : null}?
        </p>
        <div>
          <button
            className="mx-3 rounded-md bg-blue-600 text-white py-1 px-4 mr-3 tracking-wide uppercase"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="mx-3 rounded-md bg-red-500 text-white py-1 px-4 mr-3 tracking-wide uppercase"
            onClick={() => onDeleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
