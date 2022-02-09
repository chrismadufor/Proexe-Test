import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/userService";
import { updateUser } from "../store/users";

function UpdateUser() {
  const users = useSelector((state) => state.users);
  const params = useParams();
  let [data, setData] = useState({});
  let [errors, setErrors] = useState({});
  let [emptyFields, setEmptyFields] = useState(false);
  const { name, email } = data;

  const validateProperty = ({ name, value }) => {
    const regex = {
      name: /[\w]{2,20}/,
      email: /[\w-]+@[a-z]{2,}\.[a-z]{2,5}(\.[a-z]{2,3})?/,
    };

    if (name === "name") {
      if (value.trim() === "") return "Name is required";
      if (value.trim() !== "" && !regex.name.test(value))
        return "Name is invalid";
    }
    if (name === "email") {
      if (value.trim() === "") return "Email is required";
      if (value.trim() !== "" && !regex.email.test(value))
        return "Email is invalid";
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setEmptyFields(false);
    const formErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) formErrors[input.name] = errorMessage;
    else delete formErrors[input.name];
    setErrors(formErrors);

    const userData = { ...data };
    userData[input.name] = input.value;
    setData(userData);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length !== 0) return;
    if (name === "" || email === "") setEmptyFields(true);
    else {
      UserService.updateUser(params.id, data)
        .then(() => {
          dispatch(updateUser({ id: params.id, data }));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
  };

  const getInputClasses = () => {
    let classes = "border rounded-md w-full h-12 px-4 ";
    classes +=
      errors.name || errors.email || emptyFields
        ? "border-red-500"
        : "border-gray-300";
    return classes;
  };

  useEffect(() => {
    const currentUser = users.filter((user) => user.id === +params.id);
    if (currentUser) {
      setData({
        name: currentUser[0].name,
        email: currentUser[0].email,
      });
    }
    console.log(data);
  }, []);

  return (
    <div className="p-10 flex items-center justify-center">
      <div className="bg-white py-8 px-5 rounded-lg shadow w-full max-w-3xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-2xl">Update User</h3>
        </div>
        {emptyFields ? (
          <p className="my-2 text-red-500 font-semibold">
            Please fill all fields
          </p>
        ) : null}
        <form onSubmit={handleSubmit} action="#" className="w-full">
          <div className="mb-4">
            <input
              autoFocus
              className={getInputClasses()}
              type="text"
              placeholder="Enter Name"
              value={name}
              name="name"
              onChange={handleChange}
            />
            {errors.name ? (
              <p className="mt-2 text-red-500 font-semibold">{errors.name}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              className={getInputClasses()}
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {errors.email ? (
              <p className="mt-2 text-red-500 font-semibold">{errors.email}</p>
            ) : null}
          </div>
          <div className="mt-5">
            <Link to="/">
              <button className="bg-red-500 text-white py-1 px-4 mr-3 tracking-wide uppercase">
                Cancel
              </button>
            </Link>
            <button className="bg-blue-600 text-white py-1 px-4 mr-3 tracking-wide uppercase">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;