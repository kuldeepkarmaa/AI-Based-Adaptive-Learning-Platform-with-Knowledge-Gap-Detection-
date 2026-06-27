import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await API.get("/teacher/courses");

      const data = res.data.data.find((c) => c._id === id);

      setCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-lg bg-gray-200"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold text-purple-700">
          {course.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-5 mt-8">

          <div className="bg-purple-50 rounded-xl p-5">
            <h3 className="font-semibold">
              Category
            </h3>

            <p>{course.category}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="font-semibold">
              Level
            </h3>

            <p>{course.level}</p>
          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">
            Modules
          </h2>

          {course.modules.length === 0 ? (

            <div className="text-gray-500">
              No Modules Added
            </div>

          ) : (

            course.modules.map((module, index) => (

              <div
                key={index}
                className="border rounded-xl p-4 mb-4"
              >

                <h3 className="font-semibold">
                  {module.moduleName}
                </h3>

                <ul className="mt-2 list-disc ml-5">

                  {module.lessons.map((lesson, i) => (

                    <li key={i}>
                      {lesson.title}
                    </li>

                  ))}

                </ul>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}