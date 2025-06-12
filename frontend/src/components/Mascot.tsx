import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Mascots = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-10 max-h-screen bg-white">
        {/* Гол лого */}
        <img
          src="/mongolian_transliterate_dark_logo.png"
          alt="Mongolian Logo"
          className="w-40 h-auto mb-8"
        />

        <div className="flex flex-wrap gap-10 justify-center">
          {/*  Шувуу */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="transform transition-transform hover:scale-110 hover:-translate-y-2 duration-500">
                <img
                  src="/assets/eagle.png"
                  alt="Eagle Mascot"
                  className="w-52 h-52 object-contain drop-shadow-md animate-upDown"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-gray-300 shadow-lg p-4 rounded-xl text-gray-800 w-64 text-sm">
  <div className="font-bold text-blue-700 mb-1">Бүргэд</div>
  <p className="leading-relaxed">
    Монголчуудын эрх чөлөө, эр зоригийн бэлгэдэл. Бүргэдийн дүрслэл нь хүч чадал, тэнгэр өөд тэмүүлэхийг илэрхийлнэ.
  </p>
</TooltipContent>

          </Tooltip>

          {/*  Баавгай */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="transform transition-transform hover:scale-110 hover:-translate-y-2 duration-500">
                <img
                  src="/assets/mazaalai.png"
                  alt="Mazaalai Mascot"
                  className="w-52 h-52 object-contain drop-shadow-md animate-leftRight"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-gray-300 shadow-lg p-4 rounded-xl text-gray-800 w-64 text-sm">
  <div className="font-bold text-pink-700 mb-1">Мазаалай</div>
  <p className="leading-relaxed">
    Монгол орны ховор амьтан бөгөөд энэхүү системийн найрсаг, соёлт дүрийг илтгэнэ. Танин мэдэхүйн хамтрагч.
  </p>
</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Mascots;
