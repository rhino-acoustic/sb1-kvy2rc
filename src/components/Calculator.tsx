import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ResultModal } from './ResultModal';

interface CalculatorProps {
  onShowResult: (
    result: string,
    percentage: number,
    mileage: string,
    topPercentage: number,
    image: string,
    congratsMessage: string
  ) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onShowResult }) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [distance, setDistance] = useState('');
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [calculationCount, setCalculationCount] = useState(0);
  const [totalBongju, setTotalBongju] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [mileage, setMileage] = useState('');
  const [topPercentage, setTopPercentage] = useState(0);
  const [userImage, setUserImage] = useState('');
  const [congratsMessage, setCongratsMessage] = useState('');

  const handleCalculate = () => {
    const distanceNum = parseFloat(distance);
    if (isNaN(distanceNum) || distanceNum <= 0) {
      alert('올바른 거리를 입력해주세요.');
      return;
    }

    let bongju: number;
    let standardDistance: number;
    let periodText: string;
    let averageDistance: number;

    switch (period) {
      case 'daily':
        bongju = distanceNum / 17.5; // 35km가 2봉주
        standardDistance = 35;
        periodText = '하루';
        averageDistance = 12.5;
        break;
      case 'weekly':
        bongju = distanceNum / 105; // 210km가 12봉주 (2 * 6)
        standardDistance = 210;
        periodText = '주간';
        averageDistance = 80;
        break;
      case 'monthly':
        bongju = distanceNum / 350; // 700km가 40봉주 (2 * 20)
        standardDistance = 700;
        periodText = '월간';
        averageDistance = 320;
        break;
    }

    const percentageValue = (bongju / 2) * 100; // 2봉주를 100%로 설정
    const bongjuFormatted = Number.isInteger(bongju)
      ? bongju.toString()
      : bongju.toFixed(1);
    const percentageFormatted = Number.isInteger(percentageValue)
      ? percentageValue.toString()
      : percentageValue.toFixed(1);

    const resultText = `${bongjuFormatted}봉주\n(${periodText} ${distanceNum}km 이봉주 선수 훈련량의 ${percentageFormatted}%)`;

    let congratsMessage = '';
    let imageSrc = '';

    if (percentageValue >= 200) {
      imageSrc =
        'https://images.unsplash.com/photo-1539616246692-c7e729758570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '놀라운 성과입니다!\n이봉주 선수를 뛰어넘다니!';
    } else if (percentageValue >= 150) {
      imageSrc =
        'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '대단해요!\n이봉주 선수에 근접이라니!';
    } else if (percentageValue >= 100) {
      imageSrc =
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '축하합니다!\n이봉주 선수와 어깨를 나란히!!';
    } else if (percentageValue >= 90) {
      imageSrc =
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '거의 다 왔어요!\n이봉주 선수 수준에 근접했어요!';
    } else if (percentageValue >= 80) {
      imageSrc =
        'https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '대단한 노력이에요!\n이봉주 선수의 80%를 따라왔어요!';
    } else if (percentageValue >= 70) {
      imageSrc =
        'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage =
        '꾸준히 노력하고 계시네요!\n이봉주 선수의 70%에 도달했어요!';
    } else if (percentageValue >= 60) {
      imageSrc =
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '좋은 진전이에요!\n이봉주 선수의 60%를 달성했어요!';
    } else if (percentageValue >= 50) {
      imageSrc =
        'https://images.unsplash.com/photo-1470331267439-12c1f9a4e86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '절반을 넘었어요!\n이봉주 선수의 반을 따라잡았습니다!';
    } else if (percentageValue >= 40) {
      imageSrc =
        'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage =
        '꾸준한 노력이 보여요!\n이봉주 선수의 40%에 도달했어요!';
    } else if (percentageValue >= 30) {
      imageSrc =
        'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '좋은 시작이에요!\n이봉주 선수의 30%를 따라잡았어요!';
    } else if (percentageValue >= 20) {
      imageSrc =
        'https://images.unsplash.com/photo-1502230831726-fe5549140034?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage =
        '꾸준히 나아가고 있어요!\n이봉주 선수의 20%에 도달했습니다!';
    } else {
      imageSrc =
        'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=200&q=80';
      congratsMessage = '위대한 여정은 작은 한 걸음부터\n계속 나아가세요!';
    }

    let topPercentageValue = Math.max(1, 100 - percentageValue);
    topPercentageValue = Math.min(99, topPercentageValue);

    const mileageText = `일반인 기준 상위 ${topPercentageValue.toFixed(
      1
    )}%입니다 (${periodText} 평균 ${averageDistance}km)`;

    setCalculationCount((prevCount) => prevCount + 1);
    setTotalBongju((prevTotal) => prevTotal + bongju);

    setResult(resultText);
    setPercentage(percentageValue);
    setMileage(mileageText);
    setTopPercentage(topPercentageValue);
    setUserImage(croppedImage || imageSrc);
    setCongratsMessage(congratsMessage);
    setShowResult(true);
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">
        지금까지 계산된 봉주: {totalBongju.toFixed(2)} 봉주
      </p>
      <ImageUpload onImageCropped={setCroppedImage} />
      <div className="mb-4">
        <p className="mb-2">1. 기간을 선택하세요</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setPeriod('daily')}
            className={`py-2 px-4 ${
              period === 'daily' ? 'bg-dark-green text-white' : 'bg-gray-200'
            }`}
          >
            일간
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`py-2 px-4 ${
              period === 'weekly' ? 'bg-dark-green text-white' : 'bg-gray-200'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`py-2 px-4 ${
              period === 'monthly' ? 'bg-dark-green text-white' : 'bg-gray-200'
            }`}
          >
            월간
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-2">2. 거리를 입력하세요 (km)</p>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full p-2 border border-gray-300"
          placeholder="거리 입력"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-dark-green text-white py-2 px-4 hover:bg-green-800"
      >
        결과보기
      </button>
      {showResult && (
        <ResultModal
          result={result}
          percentage={percentage}
          mileage={mileage}
          topPercentage={topPercentage}
          userImage={userImage}
          congratsMessage={congratsMessage}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
};