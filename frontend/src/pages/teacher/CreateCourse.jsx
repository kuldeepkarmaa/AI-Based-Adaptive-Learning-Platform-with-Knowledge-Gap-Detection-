import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", lessons: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /api/teacher/courses
    navigate("/teacher/courses");
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
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Number of Lessons
          </label>
          <input
            type="number"
            name="lessons"
            value={form.lessons}
            onChange={handleChange}
            placeholder="e.g. 12"
            min="1"
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
