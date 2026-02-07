# ✨ Star_Dust - Full-Stack Blogging Application

A modern, full-featured blogging platform built with **React** and **Node.js**, featuring infinite scroll, AI-powered content enhancement, and real-time social interactions.

---

## 🚀 Features

* **🔐 Secure Authentication** – Robust registration and login system using **JWT** and **Bcrypt**.
* **✍️ Full Blog Management** – Complete CRUD operations for your posts.
* **🤖 AI Enhancement** – Integrated **Google Gemini AI** to polish and improve your writing.
* **📱 Infinite Scroll Feed** – Seamless browsing experience without manual pagination.
* **💬 Engagement System** – Like/Unlike posts and a threaded comments system with `@mentions`.
* **📧 Automated Notifications** – Email services via **Nodemailer** and **Mailtrap**.
* **🎨 Responsive UI** – A beautiful, modern design using a signature gradient (#00809D to #FCF8DD).

---

## 🛠️ Tech Stack

### **Frontend**
* **React 19** – UI Library
* **Vite** – Fast build tool
* **React Router** – Navigation
* **Axios** – API requests
* **React Hot Toast** – Interactive notifications

### **Backend**
* **Node.js & Express 5** – Server-side logic
* **MongoDB & Mongoose** – NoSQL Database & ODM
* **Google Gemini AI** – Content processing
* **JWT** – Secure token-based auth
* **Nodemailer** – Email handling

---

## 📦 Installation

### **1. Prerequisites**
* Node.js (v16+)
* MongoDB Atlas Account
* Google Gemini API Key

### **2. Setup Backend**
```bash
cd server
npm install
# Create a .env file in server/src/