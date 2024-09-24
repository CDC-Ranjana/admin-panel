import React, {useState} from 'react'
import Modal from "react-modal";
import news1 from "../assets/news1.avif";
import news2 from "../assets/news2.avif";
import { useDispatch, useSelector } from "react-redux";
import { addActivity, removeActivity } from "../Reducers/activitiesAndNewsSlice";
Modal.setAppElement("#root");

const Bulletine = (props) => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state.recentActivities);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [errors, setErrors] = useState({});
  const [videoError, setVideoError] = useState("");
  // hard coded for initial render
const [news,setNews]=useState([
  {
    media: news2,
    date: "August 23, 2024",
    title:
      "Soul of Braj Federation becomes partner in welfare work with Raturi Foundation and The Hindu Diaspora Foundation",
    description:
      "The Soul of Braj Federation is proud to announce its partnership with the Raturi Foundation and The Hindu Diaspora Foundation, joining forces to enhance welfare initiatives in the Braj region. This collaboration aims to amplify the impact of ongoing efforts in providing essential services like clean and healthy environments, affordable food, basic education, and skill training to the underserved communities of Vrindavan and surrounding areas.",
    button: "Click here to Read More",
  },
  {
    media: news1,
    date: "July 20, 2024",
    title:
      "The institutions providing food, education, and health services have taken new initiatives for the betterment of Braj.",
    description:
      "Institutions dedicated to providing food, education, and health services in Braj have launched new initiatives aimed at furthering the well-being of the region's residents. These efforts focus on enhancing the quality and accessibility of essential services, ensuring that the underserved communities of Braj receive the support they need to thrive. With a renewed commitment to improving living conditions, these initiatives are set to make a significant impact in Vrindavan.",
    button: " Click here to Read More",
  },
])


  const openModal = () => {
    props.setIsModalOpen(true);
    resetFormFields();
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
    setErrors({});
    setVideoError("");
  };

  const resetFormFields = () => {
    setTitle("");
    setDescription("");
    setImages([]);
    setVideos([]);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!title.trim()) formErrors.title = "Title is required.";
    if (!description.trim())
      formErrors.description = "Description is required.";
    if (!date.trim()) formErrors.date = "Date is required.";
    if (images.length === 0)
      formErrors.images = "At least one image is required.";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      dispatch(addActivity({ title, description, date, images, videos }));
      closeModal();
    } else {
      setErrors(formErrors);
    }
  };

  const handleDelete = (index) => {
    dispatch(removeActivity(index));
  };

  function newsHandleDelete(index) {
    const updatedActivities = [...recentActivities];
    updatedActivities.splice(index, 1);
    return updatedActivities;
  }
  const handleFileChange = (e, setFileState, fileType) => {
    const files = Array.from(e.target.files);
    let isValid = true;

    files.forEach((file) => {
      if (fileType === "image" && !file.type.startsWith("image/")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: "Only image files are allowed.",
        }));
        isValid = false;
      } else if (fileType === "video" && !file.type.startsWith("video/")) {
        setVideoError("Only video files are allowed.");
        isValid = false;
      }
    });

    if (isValid) {
      const fileReaderPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaderPromises).then((results) => {
        if (fileType === "image") {
          setImages((prevImages) => [...prevImages, ...results]);
          setErrors((prevErrors) => ({
            ...prevErrors,
            images: "",
          }));
        } else if (fileType === "video") {
          setVideos((prevVideos) => [...prevVideos, ...results]);
          setVideoError("");
        }
      });
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center py-6 mx-[30px]">
        <h3>Press Release</h3>
        <button
          className="bg-green-500 text-white py-2 px-10 rounded"
          onClick={openModal}
        >
          Add a news
        </button>
      </div>

      {/* Modal for adding activity */}
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Activity Modal"
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-[50px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Images:
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setImages, "image")}
              className="w-full"
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Videos:
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setVideos, "video")}
              className="w-full"
            />
            {videoError && (
              <p className="text-red-500 text-sm mt-1">{videoError}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add the news
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

      {/* Render both recentActivities (props) and Redux activities */}
      <div className="mt-6 flex flex-wrap  justify-evenly">
        {news.map((newS, index) => (
          <div key={index} className="border p-4 mb-4 rounded relative w-[35%]">
            <button
              type="button"
              onClick={() =>
                setNews(newsHandleDelete(index))
              }
              className="absolute top-[15px] right-2 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-3 py-1.5"
            >
              Delete
            </button>
            <h4 className="font-bold text-xl truncate w-[80%]">
              {newS.title}
            </h4>
            <img
              src={newS.media}
              alt={`news-${index}`}
              className="w-full object-cover mt-[20px]"
            />
            <div className="flex items-center gap-x-[5px] mt-[15px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-[10px]"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <span className="text-[13px]">{newS.date}</span>
            </div>
            <p className="mt-[10px] italic">{newS.description}</p>
          </div>
        ))}

        {/* Render Redux activities after a new one is added */}
        {activities.map((activity, index) => (
          <div key={index} className="border p-4 mb-4 rounded relative w-[35%]">
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="absolute top-[15px] right-2 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-3 py-1.5"
            >
              Delete
            </button>
            <h4 className="font-bold text-xl truncate w-[80%]">
              {activity.title}
            </h4>
            {/* Render images */}
            <div className="flex space-x-4 mt-[20px]">
              {activity.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`activity-${index}-image-${imgIndex}`}
                  className="w-full object-cover"
                />
              ))}
            </div>
            {/* Render videos */}
            {activity.videos.length > 0 && (
              <div className="mt-2">
                {activity.videos.map((video, i) => (
                  <video key={i} controls className="w-full h-auto mt-2">
                    <source src={video} type="video/mp4" />
                  </video>
                ))}
              </div>
            )}
            <div className="flex items-center gap-x-[5px] mt-[15px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-[10px]"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <span className="text-[13px]">{activity.date}</span>
            </div>
            <p className="mt-[10px] italic">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bulletine