import React, { useState } from 'react';
import About from './About';
import Features from './Features';
import LearnPage from './LearnPage';
import ScriptTypes from './ScriptTypes';
import Contact from './Contact';
import GenderPage from './GenderPage';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-white font-sans py-10">
      {/* Товчлуурууд */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
  {[
    { id: 'about', label: 'Монгол бичиг галиглагчийн тухай' },
    { id: 'features', label: 'Онцлог' },
    { id: 'rules', label: 'Суралцах' },
    { id: 'types', label: 'Монгол бичгийн фонтууд' },
    { id: 'contact', label: 'Бидэнтэй холбогдох' },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`py-2 px-4 rounded-md transition text-sm sm:text-base w-48 text-center ${
        activeTab === tab.id
          ? 'bg-[#F4B6BC] text-white'
          : 'bg-blue-100 text-[#0A2B52]'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>


      {/* Тухайн табын агуулга */}
      <div className="max-w-7xl mx-auto rounded-xl p-8 shadow">
        {activeTab === 'about' && <About />}
        {activeTab === 'features' && <Features />}
        {activeTab === 'rules' && <LearnPage />}
        {activeTab === 'types' && <ScriptTypes />}
        {activeTab === 'contact' && <Contact />}
      </div>
    </div>
  );
};

export default Homepage;
