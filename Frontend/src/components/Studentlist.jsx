import React, { useState, useEffect } from "react";
import axios from "axios";

const Studentlist = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://crudmvc.onrender.com/api/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `https://crudmvc.onrender.com/api/students/${editing}`,
          formData
        );
        setEditing(null);
      } else {
        await axios.post("https://crudmvc.onrender.com/api/students", formData);
      }
      setFormData({ name: "", email: "", grade: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crudmvc.onrender.com/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditing(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-emerald-800 tracking-tight">
          Student Management System
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <form
              onSubmit={handleSubmit}
              className="bg-white backdrop-blur-lg bg-opacity-90 rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-emerald-700 mb-8">
                {editing ? "Update Student Details" : "Add New Student"}
              </h2>

              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-emerald-800"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-emerald-800"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Grade"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-emerald-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 flex items-center justify-center gap-3 transition-all text-lg font-semibold shadow-lg"
              >
                {editing ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>

          {/* Students List Section */}
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-white backdrop-blur-lg bg-opacity-90 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-emerald-800">
                      {student.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all shadow-md"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all shadow-md"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-emerald-700 mb-2">
                    <p className="text-lg">{student.email}</p>
                  </div>

                  <div className="mt-auto">
                    <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-semibold">
                      Grade: {student.grade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentlist;
