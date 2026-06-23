import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""] }]);

  const addQuestion = () =>
    setQuestions((qs) => [...qs, { text: "", options: ["", "", "", ""] }]);

  const removeQuestion = (index) =>
    setQuestions((qs) => qs.filter((_, i) => i !== index));

  const updateQuestionText = (index, value) =>
    setQuestions((qs) => qs.map((q, i) => (i === index ? { ...q, text: value } : q)));

  const updateOption = (qIndex, oIndex, value) =>
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.map((opt, j) => (j === oIndex ? value : opt)) }
          : q
      )
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /api/teacher/quizzes
    navigate("/teacher/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8">
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Quiz Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Module 4: Entanglement"
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <label className="text-label-md font-label-md text-on-surface-variant">
                Question {qIndex + 1}
              </label>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-error p-1"
                  aria-label="Remove question"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <input
              value={q.text}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
              placeholder="Type the question..."
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  placeholder={`Option ${oIndex + 1}`}
                  className="px-4 py-2 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors text-label-md font-label-md"
        >
          <Plus size={18} />
          Add Question
        </button>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-label-md font-label-md hover:bg-primary-container transition-colors"
          >
            Save Quiz
          </button>
          <button
            type="button"
            onClick={() => navigate("/teacher/dashboard")}
            className="px-6 py-2.5 rounded-xl text-label-md font-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
