import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, removeAdmin } from "../Reducers/adminSlice"; // Adjust the path as needed

Modal.setAppElement("#root");

const Table = (props) => {
  const dispatch = useDispatch();
  const [listOfAdmins, setListOfAdmins] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    // password: "",
    phone: "",
    // isAdmin: false,
  });
  const admins = useSelector((state) => state.admin.admins);
  
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  // Fetch all admins when component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/users/all-users"
        );
        // console.log("response for the list of user", response);
        setListOfAdmins(response?.data?.data); // Assuming response.data contains the list of users
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && currentAdminId) {
        // Update user if in edit mode
        const response = await axios.put(
          `http://localhost:9000/api/users/edit/${currentAdminId}`,
          formData
        );
        console.log("User updated:", response.data);
      } else {
        // Add new user if not in edit mode
        const response = await axios.post(
          "http://localhost:9000/api/users/add-new-user",
          formData
        );
        console.log("User created:", response.data);
      }

      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        isAdmin: false,
      });
      setIsEditMode(false);
      setCurrentAdminId(null);

      // Optionally fetch admins again after adding/updating
      const updatedAdmins = await axios.get(
        "http://localhost:9000/api/users/all-users"
      );
      setListOfAdmins(updatedAdmins.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    closeModal();
  };

  // Form validation function
  const validateForm = () => {
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid.";
    }

    // if (!isEditMode && !formData.password.trim()) {
    //   // Require password only when adding a new admin
    //   validationErrors.password = "Password is required.";
    // }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 10 digits.";
    }

    return validationErrors;
  };
  console.log(errors)
  // Handle form submission for adding or updating an admin
  const handleAddAdmin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log(formErrors)
    console.log(Object.keys(formErrors).length)
  
    if (Object.keys(formErrors).length === 0) {
      // If in edit mode, dispatch updateAdmin action
      // if (isEditMode && currentAdminId) {
      //   dispatch(updateAdmin({
      //     id: currentAdminId,
      //     username: formData.username,
      //     email: formData.email,
      //     phone: formData.phone,
      //     isAdmin: formData.isAdmin,
      //     // Password updates can be handled separately if needed
      //   }));
      // } else {
        
        // Add new admin
        dispatch(
          addAdmin({
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
          })
        );
        console.log(formData)
      // }
  
      // Reset form data and states
      resetForm();
      
      // Close the modal
      closeModal();
    } else {
      // Display validation errors
      setErrors(formErrors);
    }
  };
  
  // Function to reset the form
  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      // password: "",
      phone: "",
      // isAdmin: false,
    });
    setIsEditMode(false);
    setCurrentAdminId(null);
    setErrors({});
    
  };
  
  const handleEdit = (id) => {
    const adminToEdit = listOfAdmins.find((admin) => admin._id === id);
    if (adminToEdit) {
      setFormData({
        username: adminToEdit.username,
        email: adminToEdit.email,
        password: "", // Password should be empty for security reasons
        phone: adminToEdit.phone,
        isAdmin: adminToEdit.isAdmin,
      });
      setCurrentAdminId(id);
      setIsEditMode(true);
      openModal();
    }
  };

  const handleDelete = async (index) => {
    // try {
    //   await axios.delete(`http://localhost:9000/api/users/delete/${id}`);
    //   setListOfAdmins((prevAdmins) =>
    //     prevAdmins.filter((admin) => admin._id !== id)
    //   );
    // } catch (error) {
    //   console.error("Error deleting user:", error);
    // }
    if (window.confirm("Are you sure you want to delete this admin?")) {
      dispatch(removeAdmin(index));
    }
  };

  const openModal = () => {
    props.setIsModalOpen(true);
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
    setFormData({
      username: "",
      email: "",
      // password: "",
      phone: "",
      // isAdmin: false,
    });
    setErrors({});
    setIsEditMode(false);
    setCurrentAdminId(null);
  };

  return (
    <div className="container px-2 mx-auto flex flex-col items-center  md:p-4 bg-[#f8f8f8] mb-10 ">
      <div className="flex justify-between items-center  w-full py-6">
        <h3 className="text-md md:text-2xl font-semibold">List of all the admins</h3>
        <button
          className="px-4 py-1 md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={openModal}
        >
          Add admin
        </button>
      </div>

      <table className=" bg-white border border-gray-300 mt-[24px] w-[90%]">
        <thead>
          <tr className="border-b bg-gray-200 text-[12px] md:text-[16px] lg:text-[20px]">
            <th className="py-2 px-2 md:px-4 text-left">Name</th>
            <th className="py-2 px-2 md:px-4 text-left">Email</th>
            <th className="py-2 px-2 md:px-4 text-left">Phone</th>
            <th className="py-2 px-2 md:px-4 text-center">Actions</th>
          </tr>
        </thead>
       
          <tbody>
            {admins.map((admin,index) => (
              <tr key={index} className="border-b text-[10px] md:text-[12px] lg:text-[16px]">
                <td className="py-2 px-2 md:px-4  max-w-[60px] md:max-w-[120px] lg:max-w-none truncate cursor-help" title={admin.username}>{admin.username}</td>
                <td className="py-2 px-2 md:px-4 max-w-[100px] md:max-w-[200px] lg:max-w-none truncate cursor-help" title={admin.email}>{admin.email}</td>
                <td className="py-2 px-2 md:px-4  ">{admin.phone}</td>
                <td className="py-2 px-2 md:px-4  text-center">
                  <div className="buttons flex gap-x-4 md:gap-x-6 justify-center">
                    {/* Edit Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-3 md:w-5 cursor-pointer"
                      fill="#0074e8"
                      onClick={() => handleEdit(admin)}
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                    </svg>
                    {/* Delete Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      className="w-3 md:w-4 cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
                    >
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
      </table>

      {/* Add/Edit Admin Modal */}
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Admin Modal"
        className="bg-white p-6 rounded-lg shadow-xl w-[90%] lg:w-[45%] lg:mt-[100px] mx-auto mt-[50px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Admin" : "Add New Admin"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
             {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddAdmin}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isEditMode ? "Update Admin" : "Add Admin"}
          </button> */}
        </form>
      </Modal>
    </div>
  );
};

export default Table;
