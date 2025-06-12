import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  id: number;
  original_text: string;
  transliterated_text: string;
  created_at: string;
}

const History = () => {
  const [learned, setLearned] = useState<HistoryItem[]>([]);
  const [unlearned, setUnlearned] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryItem[]>("http://localhost:5001/history");
        const allHistory = response.data;

        const localLearned: HistoryItem[] = JSON.parse(localStorage.getItem("learned") || "[]");
        const learnedIds = new Set(localLearned.map((item) => item.id));

        const learnedItems = allHistory.filter((item) => learnedIds.has(item.id));
        const unlearnedItems = allHistory.filter((item) => !learnedIds.has(item.id));

        setLearned(learnedItems);
        setUnlearned(unlearnedItems);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* 🧭 Navigation Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <button
          onClick={() => navigate("/history")}
          className="bg-blue-200 hover:bg-blue-300 text-black px-6 py-2 rounded-lg shadow font-medium transition"
        >
          Түүх
        </button>
        <button
          onClick={() => navigate("/quiz", { state: { unlearned } })}
          className="bg-blue-200 hover:bg-blue-300 text-black px-6 py-2 rounded-lg shadow font-medium transition"
        >
          Мэдлэг шалгах
        </button>
        <button
          onClick={() => navigate("/study")}
          className="bg-blue-200 hover:bg-blue-300 text-black px-6 py-2 rounded-lg shadow font-medium transition"
        >
          Суралцах
        </button>
      </div>

      {/* <h2 className="text-xl font-bold mb-6">Түүх</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Тогтоосон */}
        <div className="bg-gray-200 rounded-xl p-4">
          <h4 className="text-center bg-sky-200 py-2 rounded-md font-medium mb-4">Тогтоосон</h4>
          {learned.map((item) => (
            <div key={item.id} className="flex justify-between mb-2 items-center">
              <span className="bg-sky-100 px-2 py-1 rounded">{item.original_text}</span>
              <span className="bg-rose-100 px-2 py-1 rounded">{item.transliterated_text}</span>
            </div>
          ))}
        </div>

        {/* Тогтоогоогүй */}
        <div className="bg-gray-200 rounded-xl p-4">
          <h4 className="text-center bg-[#F4B6BC] py-2 rounded-md font-medium mb-4">Тогтоогоогүй</h4>
          {unlearned.map((item) => (
            <div key={item.id} className="flex justify-between mb-2 items-center">
              <span className="bg-sky-100 px-2 py-1 rounded">{item.original_text}</span>
              <span className="bg-rose-100 px-2 py-1 rounded">{item.transliterated_text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
