const Contact = () => {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Бидэнтэй холбогдох</h2>
        <form className="flex flex-col gap-4">
          <label>
            Имэйл:
            <input type="email" className="w-full border p-2 rounded mt-1" placeholder="email@example.com" />
          </label>
          <label>
            Хүсэлт:
            <textarea rows={5} className="w-full border p-2 rounded mt-1" placeholder="Санал хүсэлтээ бичнэ үү..." />
          </label>
          <button className="bg-[#0A2B52] text-white px-4 py-2 rounded hover:bg-[#123c6d]">
            Илгээх
          </button>
        </form>
      </div>
    );
  };
  export default Contact;
  