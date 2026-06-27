import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "", level: "",});

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post("/teacher/courses", {
      title: form.title,
      description: form.description,
      category: form.category,
      level: form.level,
      modules: []
    });

    console.log(res.data);
    alert("Course Created Successfully");

    navigate("/teacher/courses");

  } catch (err) {

    console.log(err);

    alert(err.response?.data?.message || err.message);

  }

};

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Course Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Linear Algebra Basics"
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="What will students learn?"
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div>
          <label>Category</label>
             <input
               name="category"
               value={form.category}
               onChange={handleChange}
               className="w-full px-4 py-2.5 rounded-xl border"
               required
              />
        </div>

        <div>
           <label>Level</label>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border"
              required
            >
            <option value="">Select Level</option>
             <option value="Beginner">Beginner</option>
             <option value="Intermediate">Intermediate</option>
             <option value="Advanced">Advanced</option>
            </select>
        </div>


        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-label-md font-label-md hover:bg-primary-container transition-colors"
          >
            Create Course
          </button>
          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="px-6 py-2.5 rounded-xl text-label-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
