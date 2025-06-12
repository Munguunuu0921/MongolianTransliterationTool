import { useState } from "react";
import axios from "axios";
import { FaCopy, FaExchangeAlt, FaTimes } from "react-icons/fa";

const playPronunciation = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.72;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
};

const MongolKeyboard = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [direction, setDirection] = useState<"mn-to-galig" | "galig-to-mn">("mn-to-galig");
  const [font, setFont] = useState<"bolorsoft" | "baiti">("bolorsoft");

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    try {
      const response = await axios.post<{ galig: string }>("http://localhost:5001/convert", {
        text: inputText.trim(),
        direction,
        font,
      });
      setOutputText(response.data.galig);
    } catch (error) {
      console.error("Хөрвүүлэлт амжилтгүй:", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Хуулагдлаа!");
  };

  const handleSwitch = () => {
    setDirection((prev) => (prev === "mn-to-galig" ? "galig-to-mn" : "mn-to-galig"));
    setInputText(outputText);
    setOutputText("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-10">
      <div className="flex gap-10 items-start w-full max-w-6xl flex-wrap md:flex-nowrap">
        
        {/* Input */}
        <div className="flex-1 border rounded-lg p-4 shadow text-left">
          <div className={`text-center font-semibold py-2 rounded-t-md ${direction === "mn-to-galig" ? "bg-blue-200" : "bg-pink-200"}`}>
            {direction === "mn-to-galig" ? "Монгол бичиг" : "Галиг"}
          </div>

          {/* Фонт сонголт */}
          {direction === "mn-to-galig" && (
            <div className="mt-2 mb-2">
              <label className="text-sm mr-2">Фонт сонгох:</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as "bolorsoft" | "baiti")}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="bolorsoft">Bolorsoft</option>
                <option value="baiti">Mongolian Baiti</option>
              </select>
            </div>
          )}

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={direction === "mn-to-galig" ? "Монгол бичгээр бичнэ үү..." : "Галиг үг бичнэ үү..."}
            rows={8}
            className="w-full mt-2 border-none outline-none resize-none"
          />
          <div className="flex justify-between mt-2">
  <button onClick={() => setInputText("")} className="text-gray-500 hover:text-black" title="Цэвэрлэх">
    <FaTimes size={20} />
  </button>
  <button onClick={() => handleCopy(inputText)} className="text-gray-500 hover:text-black" title="Хуулах">
    <FaCopy size={20} />
  </button>
</div>
        </div>

        {/* Чиглэл солих товч */}
        <div className="flex flex-col items-center justify-center gap-4 mt-14">
          <button onClick={handleSwitch} className="text-blue-600 hover:text-blue-800" title="Чиглэл солих">
            <FaExchangeAlt size={30} />
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 border rounded-lg p-4 shadow text-left">
          <div className={`text-center font-semibold py-2 rounded-t-md ${direction === "mn-to-galig" ? "bg-[#F4B6BC]" : "bg-blue-200"}`}>
            {direction === "mn-to-galig" ? "Галиг" : "Монгол бичиг"}
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder="Хөрвүүлэлт энд гарна..."
            rows={8}
            className="w-full mt-2 border-none outline-none resize-none bg-gray-100"
          />
          <div className="flex justify-end mt-2">
            <button onClick={() => handleCopy(outputText)} className="text-gray-500 hover:text-black">
              <FaCopy size={20} />
            </button>
            <button
              onClick={() => playPronunciation(outputText)}
              className="text-gray-500 hover:text-black ml-3"
              title="Сонсох"
            >
              🔊
            </button>
          </div>
        </div>
      </div>

      {/* Хөрвүүлэх товч */}
      <button
        onClick={handleConvert}
        className="bg-[#0A2B52] text-white px-6 py-2 mt-10 rounded shadow hover:bg-[#123a6d]"
      >
        {direction === "mn-to-galig" ? "Галиглах" : "Буцаан хөрвүүлэх"}
      </button>
    </div>
  );
};

export default MongolKeyboard;
