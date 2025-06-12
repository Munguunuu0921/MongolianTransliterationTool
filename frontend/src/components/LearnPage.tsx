import { useState } from "react";
import ToggleLearnMode from "../components/ToggleLearnMode";
import { getGroupedRuleExplanations, GroupedExplanation } from "../utils/getRuleExplanation";
import Gender from "../components/GenderPage";

const LearnPage = () => {
  const [text, setText] = useState("");
  const [learnMode, setLearnMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const explanations: GroupedExplanation[] = getGroupedRuleExplanations(text);
  const filtered = filter === "all" ? explanations : explanations.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff2f6] to-[#f9fcff] py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2B52] mb-6">Суралцах горим</h1>

      {/* Шүүлтүүр */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 w-full max-w-2xl">
        <ToggleLearnMode learnMode={learnMode} onToggle={setLearnMode} />
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Бүгд</option>
          <option value="Галиглах дүрэм">Галиглах дүрэм</option>
          <option value="Зөв бичих дүрэм">Зөв бичих дүрэм</option>
        </select>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Монгол бичгээр бичээд дүрмийн тайлбар авч үзээрэй..."
        className="w-full max-w-2xl border border-gray-300 mt-6 rounded-lg px-4 py-3 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
        rows={6}
      />

      {learnMode && text && (
        <div className="mt-8 w-full max-w-2xl p-6 border rounded-xl shadow bg-white">
          <p className="text-base text-[#0A2B52] font-semibold mb-4 border-b pb-2">Тайлбарууд:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left font-semibold text-[#0A2B52] bg-[#f4f8ff] border border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                >
                  {item.title}
                </button>
                {openIndex === idx && (
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed bg-white border border-blue-100 p-3 rounded-b-lg">
                    {item.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gender component */}
      {<div className="mt-10 w-full max-w-2xl"><Gender /></div>}
    </div>
  );
};

export default LearnPage;
