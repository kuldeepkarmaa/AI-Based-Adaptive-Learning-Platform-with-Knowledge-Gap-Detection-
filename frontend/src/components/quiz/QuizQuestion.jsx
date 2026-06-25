/**
 * QuizQuestion
 * Props:
 *   question        – question object { _id, questionText, type, options, topic, marks }
 *   questionNumber  – 1-based current question index
 *   totalQuestions  – total number of questions
 *   selectedAnswer  – currently selected answer string (or "")
 *   onAnswer        – (questionId, answer) => void
 */
export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
}) {
  if (!question) return null;

  const { _id, questionText, type, options, topic, marks } = question;

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
          Q {questionNumber} of {totalQuestions}
        </span>
        {topic && (
          <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs rounded-full">
            {topic}
          </span>
        )}
        {marks > 1 && (
          <span className="ml-auto text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">stars</span>
            {marks} marks
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="text-base font-medium leading-relaxed text-on-surface">
        {questionText}
      </p>

      {/* ── MCQ / True-False ── */}
      {(type === "mcq" || type === "true_false") && (
        <div className="space-y-3">
          {(options || []).map((opt, idx) => {
            const isSelected = selectedAnswer === opt;
            return (
              <button
                key={idx}
                onClick={() => onAnswer(_id, opt)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 group ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-outline-variant bg-surface-container hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {/* Letter badge */}
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-surface-dim text-on-surface-variant group-hover:bg-primary/20"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>

                {/* Option text */}
                <span
                  className={`text-sm flex-1 ${
                    isSelected ? "text-primary font-medium" : "text-on-surface"
                  }`}
                >
                  {opt}
                </span>

                {/* Check icon when selected */}
                {isSelected && (
                  <span
                    className="material-symbols-outlined text-primary text-base flex-shrink-0"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Short Answer ── */}
      {type === "short_answer" && (
        <div>
          <textarea
            value={selectedAnswer || ""}
            onChange={(e) => onAnswer(_id, e.target.value)}
            placeholder="Type your answer here…"
            rows={4}
            className="w-full p-4 bg-surface-container border-2 border-outline-variant rounded-xl text-sm resize-none focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          />
          <p className="text-xs text-on-surface-variant mt-1.5">
            {(selectedAnswer || "").length} characters typed
          </p>
        </div>
      )}
    </div>
  );
}
