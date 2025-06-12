const Features = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      <h2 className="text-3xl font-bold text-center mb-10">Бидний онцлог</h2>

      <div className="relative flex justify-center items-center mb-10">
        {/* Central image without next/image */}
        <img
          src="/mongolian_transliterate_dark_logo.png"
          alt="Features Diagram"
          className="max-w-xs sm:max-w-sm md:max-w-md"
        />

        {/* Left text blocks */}
        <div className="absolute top-[20%] left-[5%] w-48 text-center z-10">
          <div className="bg-sky-100 p-3 rounded shadow mb-6">
            Монгол бичгээс галиглах боломж
          </div>
          <div className="bg-sky-100 p-3 rounded shadow">
            Галигаас монгол бичиг рүү хөрвүүлэх боломж
          </div>
        </div>

        {/* Right text blocks */}
        <div className="absolute top-[20%] right-[5%] w-48 text-center z-10">
          <div className="bg-rose-100 p-3 rounded shadow mb-6">
            Зөв галиглах (Цаашид илүү сайжруулах боломж)
          </div>
          <div className="bg-rose-100 p-3 rounded shadow">
            Хайсан үгээ сонирхлоороо тогтоох боломж
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
