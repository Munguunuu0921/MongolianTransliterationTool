import React from "react";

const scriptData = [
  {
    name: "Mongolian Baiti",
    image: "/assets/baiti.png",
    description: "Windows үйлдлийн системд багтсан стандарт босоо бичигт фонт.",
    history: "Mongolian Baiti фонт нь Microsoft-аас гаргасан бөгөөд Unicode стандарттай нийцсэн анхны босоо бичгийн фонтын нэг юм. Үүнийг Windows 7-оос хойш системд суулгасан байдаг.",
    link: "/history/baiti"
  },
  {
    name: "Bolorsoft",
    image: "/assets/bolorSoft.png",
    description: "Монголын үндэсний Bolorsoft компанийн боловсруулсан монгол бичгийн фонт.",
    history: "Bolorsoft фонтыг Монголын Болорсофт компани боловсруулсан бөгөөд MS Word болон бусад редакторт тусгай кодчиллоор ашигладаг. Unicode бүрэн нийцэлгүй ч монгол бичгийн дүрслэлд хэрэглэгддэг.",
    link: "/history/bolorsoft"
  },
  {
    name: "Qagan Font",
    image: "/assets/qugan.png",
    description: "Юникод стандартад нийцсэн орчин үеийн боловсруулалттай босоо бичгийн фонт.",
    history: "Qagan фонт нь уламжлалт уран бичлэгт зориулсан бөгөөд үндсэн хэрэглээ нь чимэглэлийн зориулалттай. Unicode-д бүрэн нийцдэггүй боловч уран сайхны хэрэглээнд тохиромжтой.",
    link: "/history/qagan"
  },
  {
    name: "Oyunlag",
    image: "/assets/Oyunlag.png",
    description: "Боловсролын хэрэглээнд зориулсан уншихад хялбар дизайнтай монгол бичгийн фонт.",
    history: "Oyunlag фонт нь багш, сурагчдад зориулсан хялбаршуулсан загвартай бөгөөд хичээлд хэрэглэгдэхэд тохиромжтойгоор бүтээгдсэн.",
    link: "/history/oyunlag"
  }
];

const ScriptTypes = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Монгол бичгийн фонтууд</h2>
      <p className="mb-8 text-gray-700">
        Монгол бичгийн олон фонт байдаг бөгөөд энэхүү системд уламжлалт босоо бичиг (Unicode) дэмжигддэг. Доорх төрлүүд нь хамгийн түгээмэл хэрэглэгддэг фонтууд юм.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scriptData.map((script, index) => (
          <div key={index} className="bg-white border rounded-xl shadow p-4 hover:shadow-lg transition">
            <img src={script.image} alt={script.name} className="w-full h-48 object-contain rounded mb-3" />
            <h3 className="text-xl font-bold mb-2">{script.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{script.description}</p>
            <details className="text-sm mb-2">
              <summary className="cursor-pointer text-blue-900">Дэлгэрэнгүй үзэх</summary>
              <p className="mt-2 text-gray-600">{script.history}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptTypes;
