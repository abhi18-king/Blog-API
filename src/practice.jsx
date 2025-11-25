// /* Background */
// body {
//   margin: 0;
//   font-family: "Poppins", sans-serif;
//   background: linear-gradient(135deg, #1e3a8a, #4c1d95, #06b6d4);
//   background-size: 400% 400%;
//   animation: bgColor 10s ease infinite;
//   color: #fff;
// }

// @keyframes bgColor {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }

// /* Main Container */
// .container {
//   max-width: 600px;
//   margin: 50px auto;
//   background: rgba(255, 255, 255, 0.12);
//   padding: 25px;
//   border-radius: 18px;
//   backdrop-filter: blur(12px);
//   box-shadow: 0 0 20px rgba(255,255,255,0.25);
//   text-align: center;
// }

// /* Title */
// .title {
//   font-size: 32px;
//   font-weight: bold;
//   margin-bottom: 20px;
//   color: #d1eaff;
//   text-shadow: 0 0 20px rgba(0, 238, 255, 0.7);
// }

// /* Input Section */
// .input-section {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 25px;
// }

// .input-section input {
//   width: 75%;
//   padding: 12px;
//   border-radius: 10px;
//   border: none;
//   outline: none;
//   font-size: 16px;
// }

// /* Buttons */
// .add-btn {
//   width: 25%;
//   background: #00f2fe;
//   border: none;
//   padding: 12px;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: transform .2s, background .3s;
// }

// .add-btn:hover {
//   background: #03e1eb;
//   transform: scale(1.05);
// }

// /* Blog Card */
// .blog-list {
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// }

// .blog-card {
//   background: rgba(255, 255, 255, 0.18);
//   border-radius: 14px;
//   padding: 15px;
//   text-align: left;
//   backdrop-filter: blur(8px);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .blog-text {
//   font-size: 18px;
//   font-weight: 500;
// }

// /* Buttons in card */
// .btn-group {
//   display: flex;
//   gap: 8px;
// }

// .delete-btn,
// .update-btn {
//   padding: 7px 12px;
//   border: none;
//   border-radius: 8px;
//   font-size: 12px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: 0.3s ease;
// }

// .delete-btn {
//   background: #ff5252;
//   color: #fff;
// }

// .update-btn {
//   background: #ffd43b;
//   color: #000;
// }

// .delete-btn:hover {
//   background: #ff2d2d;
//   transform: scale(1.08);
// }

// .update-btn:hover {
//   background: #ffcd1a;
//   transform: scale(1.08);
// }

// /* Responsive */
// @media (max-width: 600px) {
//   .input-section {
//     flex-direction: column;
//   }
//   .input-section input,
//   .add-btn {
//     width: 100%;
//   }
// }






// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css"
// import "./App.css"

// function App() {

//   var [title, setTitle] = useState("")
//   var [description, setDescription] = useState("")
//   var [data, setData] = useState([])

//   var API_URL = "https://691d666fd58e64bf0d360c0a.mockapi.io/data"


//   async function sendData() {
//     if (!title.trim() || !description.trim()) {
//       toast.error("All fields are required!")
//       return
//     }

//     var formData = { 
//       myTitle: title, 
//       myDiscription: description
//      }

//     var result = await fetch("https://691d666fd58e64bf0d360c0a.mockapi.io/data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     })

//     if (result.ok) {
//       toast.success("Blog Added Successfully")
//       setTitle("")
//       setDescription("")
//       fetchData()
//     }
//   }

// 1
//   async function fetchData() {
//     var response = await fetch("https://691d666fd58e64bf0d360c0a.mockapi.io/data")
//     var myResult = await response.json()
//     setData(myResult)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])


//   async function deleteBlog(id) {
//     var res = await fetch(`${"https://691d666fd58e64bf0d360c0a.mockapi.io/data"}/${id}`, { method: "DELETE" })
//     if (res.ok) {
//       toast.info("Blog Deleted")
//       fetchData()
//     }
//   }


//   async function updateBlog(item) {
//     var newTitle = prompt("Update Title:", item.myTitle)
//     var newDesc = prompt("Update Description:", item.myDiscription)

//     if (!newTitle || !newDesc) {
//       toast.error("Update Cancelled")
//       return
//     }

//     var updatedItem = {
//       myTitle: newTitle,
//       myDiscription: newDesc
//     }

//     var result = await fetch(`${"https://691d666fd58e64bf0d360c0a.mockapi.io/data"}/${item.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedItem)
//     })

//     if (result.ok) {
//       toast.success("Blog Updated Successfully")
//       fetchData()
//     }
//   }

//   return (
//     <div className="container">
//       <ToastContainer />

//       <h1 className="title">📝 Blog Manager</h1>

//       <div className="input-section">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter Title"
//         />

//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter Description"
//         />

//         <button className="add-btn" onClick={sendData}>
//           Add Blog
//         </button>
//       </div>

//       <div className="blog-list">
//         {data.map((item) => (
//           <div className="blog-card" key={item.id}>
//             <div>
//               <p className="blog-title">{item.myTitle}</p>
//               <p className="blog-desc">{item.myDiscription}</p>
//             </div>

//             <div className="btn-group">
//               <button className="update-btn" onClick={() => updateBlog(item)}>Edit</button>
//               <button className="delete-btn" onClick={() => deleteBlog(item.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App




// like medium page

body {
  background: #ffffff;
  font-family: "Inter", sans-serif;
  margin: 0;
  display: flex;
  justify-content: center;
}

.container {
  width: 750px;
  margin-top: 40px;
}

.title {
  font-size: 34px;
  font-weight: 800;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 20px;
}

/* Input Section */
.input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #cfcfcf;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: black;
}

.add-btn {
  background: black;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
  transition: .3s;
}

.add-btn:hover {
  background: #333;
}

/* Blog list */
.blog-list {
  margin-top: 20px;
}

.blog-card {
  background: #fdfdfd;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 18px;
  transition: 0.25s;
}

.blog-card:hover {
  background: #f3f3f3;
}

.blog-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.blog-desc {
  margin-top: 6px;
  color: #555;
  font-size: 15px;
}

/* Buttons */
.btn-group {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.update-btn,
.delete-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 7px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: .3s;
}

.update-btn:hover {
  background: #1dbf73;
  color: white;
  border-color: #1dbf73;
}

.delete-btn:hover {
  background: #ff3d3d;
  color: white;
  border-color: #ff3d3d;
}
