import Mascots from "./Mascot";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Монгол бичиг галиглагчийн тухай</h2>
      <p className="mb-4 text-gray-700">
        Энэхүү систем нь монгол бичгийг болорсофт болон baiti фонтуудын ялгааг үндэслэн Unicode
        тэмдэгтүүдийг таньж, зөв галиглах зориулалттай. Монгол бичгээс латин галиг, мөн
        эсрэг чиглэлд хөрвүүлэх боломжтой.
      </p>

      {/*  Mascots component-г нэмэх */}
      <Mascots />
    </div>
  );
};

export default About;
