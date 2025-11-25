import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API_URL = "https://691d666fd58e64bf0d360c0a.mockapi.io/data";

  async function sendData() {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    let formData = {
      myTitle: title,
      myDiscription: description,
    };

    let result = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (result.ok) {
      toast.success("Blog Added Successfully");
      setTitle("");
      setDescription("");
      setShowForm(false);
      fetchData();
    }
  }

  async function fetchData() {
    let response = await fetch(API_URL);
    let myResult = await response.json();
    setData(myResult);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteBlog(id) {
    let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.info("Blog Deleted");
      fetchData();
    }
  }

  async function updateBlog(item) {
    let newTitle = prompt("Update Title:", item.myTitle);
    let newDesc = prompt("Update Description:", item.myDiscription);

    if (!newTitle || !newDesc) {
      toast.error("Update Cancelled");
      return;
    }

    let updatedItem = {
      myTitle: newTitle,
      myDiscription: newDesc,
    };

    let result = await fetch(`${API_URL}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    if (result.ok) {
      toast.success("Blog Updated Successfully");
      fetchData();
    }
  }

  return (
    <div>
      <ToastContainer />

      {/* HOME SCREEN → Only Pencil */}
      {!open && (
        <div className="pencil-wrapper">
          <button className="pencil-btn" onClick={() => setOpen(true)}>
            <FaPencilAlt size={110} />
          </button>
          <h3 className="pencil-text">Click Pencil To View Blogs ✍️</h3>
        </div>
      )}

      {/* BLOG LIST SCREEN */}
      {open && !showForm && (
        <div className="container">
          <h1 className="title">📚 All Blogs</h1>

          <div className="blog-list">
            {data.map((item) => (
              <div className="blog-card" key={item.id}>
                <p className="blog-title">{item.myTitle}</p>
                <p className="blog-desc">{item.myDiscription}</p>

                <div className="btn-group">
                  <button className="update-btn" onClick={() => updateBlog(item)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteBlog(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FLOATING PENCIL TO OPEN FORM */}
          <button className="floating-pencil" onClick={() => setShowForm(true)}>
            <FaPencilAlt size={45} />
          </button>
        </div>
      )}

      {/* ADD BLOG FORM SCREEN */}
      {showForm && (
        <div className="container">
          <h1 className="title">✍️ Add New Blog</h1>

          <div className="input-section">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
            <button className="add-btn" onClick={sendData}>Submit</button>
          </div>

          <button className="delete-btn" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
