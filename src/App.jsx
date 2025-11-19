import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

function App() {

  var [title, setTitle] = useState("")
  var [description, setDescription] = useState("")
  var [data, setData] = useState([])

  var API_URL = "https://691d666fd58e64bf0d360c0a.mockapi.io/data"


  async function sendData() {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!")
      return
    }

    var formData = { 
      myTitle: title, 
      myDiscription: description
     }

    var result = await fetch("https://691d666fd58e64bf0d360c0a.mockapi.io/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (result.ok) {
      toast.success("Blog Added Successfully")
      setTitle("")
      setDescription("")
      fetchData()
    }
  }

1
  async function fetchData() {
    var response = await fetch("https://691d666fd58e64bf0d360c0a.mockapi.io/data")
    var myResult = await response.json()
    setData(myResult)
  }

  useEffect(() => {
    fetchData()
  }, [])


  async function deleteBlog(id) {
    var res = await fetch(`${"https://691d666fd58e64bf0d360c0a.mockapi.io/data"}/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.info("Blog Deleted")
      fetchData()
    }
  }


  async function updateBlog(item) {
    var newTitle = prompt("Update Title:", item.myTitle)
    var newDesc = prompt("Update Description:", item.myDiscription)

    if (!newTitle || !newDesc) {
      toast.error("Update Cancelled")
      return
    }

    var updatedItem = {
      myTitle: newTitle,
      myDiscription: newDesc
    }

    var result = await fetch(`${"https://691d666fd58e64bf0d360c0a.mockapi.io/data"}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    })

    if (result.ok) {
      toast.success("Blog Updated Successfully")
      fetchData()
    }
  }

  return (
    <div className="container">
      <ToastContainer />

      <h1 className="title">📝 Blog Manager</h1>

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

        <button className="add-btn" onClick={sendData}>
          Add Blog
        </button>
      </div>

      <div className="blog-list">
        {data.map((item) => (
          <div className="blog-card" key={item.id}>
            <div>
              <p className="blog-title">{item.myTitle}</p>
              <p className="blog-desc">{item.myDiscription}</p>
            </div>

            <div className="btn-group">
              <button className="update-btn" onClick={() => updateBlog(item)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteBlog(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
