import React, { useEffect, useReducer, useRef } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
];

const INITIAL = {
  questions: QUESTIONS,
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",           // "Correct!" | "Incorrect. Correct answer: ..."
  timeLeft: 10,           // 10s mỗi câu
  highScore: 0,
  locked: false,          // khóa lựa chọn sau khi chấm
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_HIGHSCORE":
      return { ...state, highScore: action.value ?? 0 };
    case "SELECT_OPTION":
      if (state.locked || state.showScore) return state;
      return { ...state, selectedOption: action.payload, feedback: "" };
    case "TICK": {
      if (state.showScore) return state;
      const next = Math.max(0, state.timeLeft - 1);
      // Hết giờ mà chưa chọn -> tự coi là sai, khóa câu
      if (next === 0 && !state.locked) {
        const correctAns = state.questions[state.currentQuestion].answer;
        return {
          ...state,
          feedback: `Hết giờ. Đáp án đúng: ${correctAns}`,
          locked: true,
        };
      }
      return { ...state, timeLeft: next };
    }
    case "GRADE_CURRENT": {
      if (state.locked || state.showScore) return state;
      const q = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === q.answer;
      return {
        ...state,
        feedback: isCorrect ? "Correct!" : `Incorrect. Đáp án đúng: ${q.answer}`,
        score: isCorrect ? state.score + 1 : state.score,
        locked: true,
      };
    }
    case "NEXT_QUESTION": {
      const isLast = state.currentQuestion === state.questions.length - 1;
      if (isLast) {
        const newHigh = Math.max(state.highScore, state.score);
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        timeLeft: 10,
        locked: false,
      };
    }
    case "RESTART_QUIZ":
      return {
        ...state,
        currentQuestion: 0,
        selectedOption: "",
        score: 0,
        showScore: false,
        feedback: "",
        timeLeft: 10,
        locked: false,
      };
    default:
      return state;
  }
}

export default function QuestionBankEnhanced() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timeLeft, highScore, locked } = state;

  // load highScore từ localStorage
  useEffect(() => {
    const saved = Number(localStorage.getItem("quizHighScore") || 0);
    dispatch({ type: "LOAD_HIGHSCORE", value: saved });
  }, []);

  // đồng bộ highScore khi kết thúc
  useEffect(() => {
    if (showScore) localStorage.setItem("quizHighScore", String(highScore));
  }, [showScore, highScore]);

  // countdown mỗi giây
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestion]); // reset interval khi sang câu mới

  const handleOptionSelect = (opt) => dispatch({ type: "SELECT_OPTION", payload: opt });
  const handleGrade = () => dispatch({ type: "GRADE_CURRENT" });
  const handleNext = () => dispatch({ type: "NEXT_QUESTION" });
  const handleRestart = () => dispatch({ type: "RESTART_QUIZ" });

  const q = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + (showScore ? 1 : 0)) / questions.length) * 100);
  const stepLabel = `${Math.min(currentQuestion + 1, questions.length)}/${questions.length}`;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>Kết quả: {score} / {questions.length}</h2>
            <p>Điểm cao nhất: <b>{highScore}</b></p>
            <Button variant="primary" onClick={handleRestart}>Làm lại</Button>
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center mb-3">
              <div className="me-3" style={{ minWidth: 90 }}><b>Tiến độ:</b> {stepLabel}</div>
              <ProgressBar now={progress} style={{ flex: 1 }} />
            </div>

            <div className="d-flex align-items-baseline justify-content-between">
              <h5 style={{ marginBottom: 0 }}>
                Câu {q.id}: {q.question}
              </h5>
              <div>
                Thời gian:{" "}
                <span style={{ fontWeight: "bold", color: timeLeft <= 5 ? "red" : undefined }}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="mt-3">
              {q.options.map((opt, idx) => {
                const active = selectedOption === opt;
                return (
                  <Button
                    key={idx}
                    variant={active ? "success" : "outline-secondary"}
                    className="m-2"
                    disabled={locked}
                    onClick={() => handleOptionSelect(opt)}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>

            {feedback && (
              <Alert className="mt-3" variant={feedback.startsWith("Correct") ? "success" : "warning"}>
                {feedback}
              </Alert>
            )}

            <div className="mt-3">
              {!locked ? (
                <Button
                  variant="primary"
                  disabled={!selectedOption && timeLeft > 0}
                  onClick={handleGrade}
                >
                  Chấm câu này
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? "Kết thúc" : "Câu tiếp theo"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}
