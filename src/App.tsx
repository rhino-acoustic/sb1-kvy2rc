import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { ResultModal } from './components/ResultModal';
import { AdminPage } from './components/AdminPage';
import { AppConfig } from './types';

const App: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [mileage, setMileage] = useState('');
  const [topPercentage, setTopPercentage] = useState(0);
  const [userImage, setUserImage] = useState('');
  const [congratsMessage, setCongratsMessage] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [config, setConfig] = useState<AppConfig>({
    topImage:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80',
    topImageAlt: '이봉주 선생님',
    title: '이봉주 계산기',
    description: '이봉주 마라톤 훈련법 : 일 35km , 주 210km, 월 700km',
    quote: '400페이스로 하루에 3~40km 조깅하는거죠, 주 6일즘?!',
    bannerImage:
      'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=150&q=80',
    bannerAlt: '마라톤 배너',
    logoText: 'vegavery®',
    logoLink: 'https://www.youtube.com/@%EB%B2%A0%EA%B0%80%EB%B2%A0%EB%A6%AC',
  });

  const handleShowResult = (
    result: string,
    percentage: number,
    mileage: string,
    topPercentage: number,
    image: string,
    congratsMessage: string
  ) => {
    setResult(result);
    setPercentage(percentage);
    setMileage(mileage);
    setTopPercentage(topPercentage);
    setUserImage(image);
    setCongratsMessage(congratsMessage);
    setShowResult(true);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <img
        src={config.topImage}
        alt={config.topImageAlt}
        className="w-full max-w-[400px] h-[250px] object-cover"
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.src =
            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80';
          imgElement.alt = '대체 이미지';
        }}
      />
      <div className="w-full max-w-[400px] bg-white shadow-md overflow-hidden">
        <div className="p-4">
          <Calculator onShowResult={handleShowResult} />
          <p className="text-sm text-gray-600 text-center mt-4 mb-2">
            {config.description}
          </p>
          <blockquote className="italic text-sm text-gray-500 text-center mb-4">
            "{config.quote}"
          </blockquote>
        </div>
      </div>
      {showResult && (
        <ResultModal
          result={result}
          percentage={percentage}
          mileage={mileage}
          topPercentage={topPercentage}
          userImage={userImage}
          congratsMessage={congratsMessage}
          onClose={handleCloseResult}
        />
      )}
      <img
        src={config.bannerImage}
        alt={config.bannerAlt}
        className="w-full max-w-[400px] h-[150px] object-cover mt-4"
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.src =
            'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=150&q=80';
          imgElement.alt = '대체 배너 이미지';
        }}
      />
      <footer className="mt-4 text-center">
        <a
          href={config.logoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark-green hover:text-green-700"
        >
          {config.logoText}
        </a>
      </footer>
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 right-4 bg-gray-200 text-gray-700 py-2 px-4 hover:bg-gray-300"
      >
        관리자
      </button>
      {showAdmin && (
        <AdminPage
          config={config}
          setConfig={setConfig}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
};

export default App;
