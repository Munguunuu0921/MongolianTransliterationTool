import React, { useState } from "react";
import { detectVowelGender } from "../utils/vowelGenderDetector";

const GenderPage = () => {
  const [text, setText] = useState("");
  const [gender, setGender] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setGender(detectVowelGender(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff2f6] to-[#f9fcff] py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#0A2B52] mb-6">Эгшгийн зохицол таних</h1>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Монгол үг бичнэ үү..."
        className="w-full max-w-md border border-gray-300 rounded px-4 py-2 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      {gender && (
        <div className="mt-6 text-lg text-gray-800 font-semibold">
          Эгшгийн хүйс: {
            gender === "masculine"
              ? "Арын эгшиг давамгайлсан (эрэгтэй)"
              : gender === "feminine"
              ? "Өмнөх эгшиг давамгайлсан (эмэгтэй)"
              : "Саармаг буюу холимог"
          }
        </div>
      )}
    </div>
  );
};

export default GenderPage;
