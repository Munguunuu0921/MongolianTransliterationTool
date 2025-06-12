import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface QuizItem {
  id: number;
  original_text: string;
  transliterated_text: string;
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const unlearnedWords: QuizItem[] = location.state?.unlearned || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<QuizItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);

  const current = unlearnedWords[currentIndex];

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    if (userAnswer.trim().toLowerCase() === current.transliterated_text.toLowerCase()) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, current]);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setUserAnswer("");
      setShowFeedback(false);
      if (currentIndex + 1 < unlearnedWords.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsQuizDone(true);
      }
    }, 1500);
  };

  const handleFinish = () => {
    const existingLearned = JSON.parse(localStorage.getItem("learned") || "[]");
    const updatedLearned = [...existingLearned];

    correctAnswers.forEach((correct) => {
      if (!updatedLearned.some((item: QuizItem) => item.id === correct.id)) {
        updatedLearned.push(correct);
      }
    });

    localStorage.setItem("learned", JSON.stringify(updatedLearned));
    navigate("/history", { state: { justFinishedQuiz: true } });
  };

  const percentage = ((score / unlearnedWords.length) * 100).toFixed(0);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col md:flex-row gap-10 items-center justify-center">
      <div className="bg-sky-100 w-full md:w-1/2 p-6 rounded-xl shadow">
        <h2 className="bg-sky-200 p-2 rounded text-center font-semibold mb-4">Мэдлэг шалгах</h2>
        {!isQuizDone ? (
          current ? (
            <>
              <p className="text-lg mb-4 text-center">
                Монгол бичиг <strong>"{current.original_text}"</strong> үгийн галиг юу вэ?
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Галиг оруулна уу..."
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded"
                >
                  Илгээх
                </button>
                <button
                  onClick={() => {
                    if (currentIndex + 1 < unlearnedWords.length) {
                      setCurrentIndex(currentIndex + 1);
                    } else {
                      setIsQuizDone(true);
                    }
                  }}
                  className="bg-rose-200 hover:bg-[#F4B6BC] px-4 py-2 rounded"
                >
                  Алгасах
                </button>
              </div>
              {showFeedback && (
                <div className="text-center mt-2 text-sm text-gray-600">
                  Зөв хариулт: <strong>{current.transliterated_text}</strong>
                </div>
              )}
            </>
          ) : null
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Тест дууслаа 🎉</p>
            <p className="mb-2 text-gray-700">
              Та {unlearnedWords.length}-аас {score} үг зөв галиглалаа.
            </p>
            <button
              onClick={handleFinish}
              className="mt-4 bg-[#0A2B52] text-white px-6 py-2 rounded-md hover:bg-[#123c6d] transition"
            >
              Түүх рүү буцах
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center">
        <p className="mb-4 text-gray-600">Үнэлгээ</p>
        <div className="w-40 h-40 rounded-full border-4 border-green-300 flex items-center justify-center text-3xl font-bold text-green-500">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Quiz;
