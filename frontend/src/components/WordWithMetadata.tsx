import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



export interface WordMetadata {
  word: string;
  translit: string;
  gender: "masculine" | "feminine" | "neutral";
  fvsUsed?: boolean;
  mvsUsed?: boolean;
  ruleTitles?: string[];
}

const WordWithMetadata = ({
  word,
  translit,
  gender,
  fvsUsed = false,
  mvsUsed = false,
  ruleTitles = [],
}: WordMetadata) => {
  const genderLabel =
    gender === "masculine"
      ? "Арын эгшиг (эрэгтэй)"
      : gender === "feminine"
      ? "Өмнөх эгшиг (эмэгтэй)"
      : "Саармаг";

  return (
    <div className="inline-block relative group">
      <span className="text-blue-700 font-medium cursor-help">
        {translit}
        <FaInfoCircle className="inline ml-1 text-gray-500 hover:text-blue-600" />
      </span>

      <div className="absolute z-10 hidden group-hover:block bg-white border shadow-md p-3 text-sm w-64 rounded mt-2">
        <p><b>Монгол үг:</b> {word}</p>
        <p><b>Хүйс:</b> {genderLabel}</p>
        <p><b>MVS:</b> {mvsUsed ? "Тийм" : "Үгүй"}</p>
        <p><b>FVS:</b> {fvsUsed ? "Тийм" : "Үгүй"}</p>
        {ruleTitles.length > 0 && (
          <div>
            <p className="font-semibold mt-1">Холбогдох дүрмүүд:</p>
            <ul className="list-disc ml-5">
              {ruleTitles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordWithMetadata;
