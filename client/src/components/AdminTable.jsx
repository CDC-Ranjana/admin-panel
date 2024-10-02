import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // This is required for accessibility reasons

const Table = (props) => {
  // Mock Data
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    { id: 2, name: "Mohit", email: "jane@example.com", phone: "098-765-4321" },
    { id: 3, name: "Aditya", email: "jane@example.com", phone: "098-765-4321" },
    { id: 4, name: "Suhash", email: "jane@example.com", phone: "098-765-4321" },
  ]);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", phone: "" });

  // Edit Functionality
  const handleEdit = (id) => {
    alert(`Edit user with id: ${id}`);
  };

  // Delete Functionality
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // Handle opening/closing of modal
  const openModal = () => {
    props.setIsModalOpen(true);
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
    setNewAdmin({ name: "", email: "", phone: "" }); // Reset form fields
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  // Handle adding a new admin
  const handleAddAdmin = () => {
    const newAdminData = {
      id: data.length + 1, // Simple increment ID
      ...newAdmin,
    };
    setData([...data, newAdminData]);
    closeModal(); // Close modal after adding admin
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center py-6">
        <h3 className="text-[20px]">List of all the admins</h3>
        <button
          className="bg-[#0074e8] text-white py-2 px-10 rounded"
          onClick={openModal}
        >
          Add admin
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4">{item.phone}</td>
              <td className="py-2 px-4 text-center">
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEdit(item.id)}
                >
                   Edit 
                 
                </button> */}
                
                {/* <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button> */}
                <div className="buttons flex gap-x-[30px]  justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px]" fill="#0074e8" onClick={() => handleEdit(item.id)}>
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-[15px]  cursor-pointer text-red-500 "
                  onClick={() => handleDelete(item.id)}
                >
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Admin Modal */}
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Admin Modal"
       className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-[100px] "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
      >
        {/* <h2 className="text-xl font-bold mb-4">Add New Admin</h2> */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={newAdmin.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-bold">Phone</label>
            <input
              type="text"
              name="phone"
              value={newAdmin.phone}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddAdmin}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Table;
