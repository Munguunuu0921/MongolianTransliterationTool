import React from "react";

interface Metadata {
  gender?: "masculine" | "feminine" | "neutral";
  syllables?: number;
  rules?: string[];
  mvs?: boolean;
  fvs?: boolean;
}

const MetadataTooltip = ({ metadata }: { metadata: Metadata }) => {
  return (
    <div className="text-left text-sm p-2 bg-white border border-gray-300 rounded shadow w-64">
      <p><strong>Хүйс:</strong> {metadata.gender === "masculine" ? "эрэгтэй" : metadata.gender === "feminine" ? "эмэгтэй" : "саармаг"}</p>
      <p><strong>Үеийн тоо:</strong> {metadata.syllables}</p>
      <p><strong>MVS:</strong> {metadata.mvs ? "байгаа" : "байхгүй"}</p>
      <p><strong>FVS:</strong> {metadata.fvs ? "байгаа" : "байхгүй"}</p>
      <div className="mt-2">
        <strong>Хэрэглэсэн дүрэм:</strong>
        <ul className="list-disc pl-5">
          {metadata.rules?.map((r, idx) => <li key={idx}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default MetadataTooltip;