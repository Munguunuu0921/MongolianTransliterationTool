import React, { useState } from "react";

// Өгөгдөл
const wordList = [
  { image: "/assets/unique/1.png", mongolian: "ᠭᠦᠯᠦᠭᠡ", galig: "gvlvge" },
  { image: "/assets/unique/2.png", mongolian: "ᠬᠡᠦᠬᠡᠳ", galig: "heuhed" },
  { image: "/assets/unique/3.png", mongolian: "ᠴᠡᠩᠮᠡ", galig: "tsengme" },
  { image: "/assets/unique/4.png", mongolian: "ᠰᠣᠶᠤᠮᠪᠤ", galig: "soyongbu" },
  { image: "/assets/unique/5.png", mongolian: "ᠨᠠᠢᠮᠠ", galig: "naima" },
  { image: "/assets/unique/6.png", mongolian: "ᠨᠢᠯᠪᠤᠰᠤ", galig: "nilbusu" },
  { image: "/assets/unique/7.png", mongolian: "ᢉᠦᠶᠦᢈᠦ", galig: "gvyvhv" },
  { image: "/assets/unique/8.png", mongolian: "ᠭᠤᠶᠤᠬᠤ", galig: "guyuhu" },
  { image: "/assets/unique/9.png", mongolian: "ᠠᠶᠤᠬᠤ", galig: "ayuhu" },
  { image: "/assets/unique/10.png", mongolian: "ᠶᠠᠮᠪᠭᠷ", galig: "yambar" },
];

const getRandomWords = (count: number) => {
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Study = () => {
  const [mode, setMode] = useState<"mongolian" | "galig">("mongolian");
  const [questions] = useState(() => getRandomWords(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);

  const current = questions[currentIndex];

  const handleCheck = () => {
    const isCorrect = answer.trim() === current[mode];
    setResult(isCorrect);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setResult(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Өвөрмөц бичлэгт үг бичих</h2>

      <p className="mb-2 text-sm text-gray-600">
        {currentIndex + 1} / 10 — Оноо: {score}
      </p>

      <img src={current.image} alt="target" className="mx-auto w-48 h-48 object-contain mb-4" />

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setMode("mongolian")}
          className={`px-4 py-1 rounded ${
            mode === "mongolian" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Монгол бичгээр
        </button>
        <button
          onClick={() => setMode("galig")}
          className={`px-4 py-1 rounded ${
            mode === "galig" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Галигаар
        </button>
      </div>

      <input
        type="text"
        className="border px-4 py-2 rounded text-center w-full max-w-md"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Бичнэ үү..."
      />

      {/* Шалгах товч */}
      {result === null ? (
        <button
          onClick={handleCheck}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
        >
          Шалгах
        </button>
      ) : (
        <>
          <p className={`mt-4 font-bold ${result ? "text-green-600" : "text-red-600"}`}>
            {result ? "Зөв бичлээ!" : "Буруу байна!"}
          </p>
          {currentIndex < 9 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Дараагийн үг
            </button>
          ) : (
            <p className="mt-4 text-lg font-bold text-purple-700">
              Тест дууслаа! Нийт оноо: {score} / 10
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Study;
