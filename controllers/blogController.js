const Blog = require("../models/blogModel");



// creating post 
exports.createPost = async (req, res) => {
  const { title, description, eventHighlights, createdBy  } = req.body;

  // Get uploaded files from Cloudinary
  console.log("req.file in blog controller ", req.files);
  const images = req.images
  const videos = req.videos
  console.log("images", images, "videos", videos);


  try {
    const newBlog = new Blog({
      title,
      description,
      eventHighlights,
      images,
      videos,
      createdBy
    });
    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog post', error });
  }
}

// getting all the lists of posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by created date in descending order
    res.status(200).json({ message: 'Blogs fetched successfully', blogs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
}

// edditing any particular post
exports.editBlog = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL parameters
  const { title, description, eventHighlights , createdBy } = req.body;
  const images = req.images;
  const videos = req.videos;

  try {
    // Find the blog post by ID and update it with the new data
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, eventHighlights, images, videos, createdBy }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log("result", updatedBlog);

    res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog post', error });
  }
};

// deleting any particular post
exports.deleteBlog = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL parameters
  try {
    // Find the blog post by ID and remove it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog post', error });
  }
};