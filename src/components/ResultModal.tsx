import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { saveElementAsImage } from '../utils/saveImage';

interface ResultModalProps {
  result: string;
  percentage: number;
  mileage: string;
  topPercentage: number;
  userImage: string;
  congratsMessage: string;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  percentage,
  mileage,
  topPercentage,
  userImage,
  congratsMessage,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
    };
    img.src = userImage;
  }, [userImage]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        alert('링크가 클립보드에 복사되었습니다.');
      },
      (err) => {
        console.error('링크 복사 실패:', err);
      }
    );
  };

  const handleSaveResult = () => {
    if (modalRef.current) {
      try {
        saveElementAsImage(modalRef.current, '이봉주_계산기_결과.png');
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error);
        alert('이미지 저장에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // 결과 문자열 파싱
  const bongjuMatch = result.match(/(\d+(\.\d+)?)봉주/);
  const bongjuValue = bongjuMatch ? bongjuMatch[1] : '';
  const distanceMatch = result.match(/(\d+)km/);
  const distanceValue = distanceMatch ? distanceMatch[1] : '';
  const percentageMatch = result.match(/(\d+(\.\d+)?)%/);
  const percentageValue = percentageMatch ? percentageMatch[1] : '';
  const periodMatch = result.match(/(하루|주간|월간)/);
  const periodValue = periodMatch ? periodMatch[1] : '하루';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-dark-green mb-4">vegavery®</h2>
          <div
            className="w-full mb-4 overflow-hidden"
            style={{ aspectRatio: imageAspectRatio }}
          >
            <img
              src={userImage}
              alt="User uploaded image or level image"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg font-semibold text-green-600 mb-2 whitespace-pre-line">
            {congratsMessage}
          </p>
          <p className="text-3xl font-bold text-green-600 mb-3">
            당신은 {bongjuValue}봉주입니다!
          </p>
          <p className="text-lg text-gray-700 mb-2">
            ({periodValue} {distanceValue}km 이봉주 선수 훈련량의{' '}
            {percentageValue}%)
          </p>
          <p className="text-sm text-gray-500 whitespace-pre-line">{mileage}</p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleCopyLink}
            className="w-[48%] py-2 bg-green-500 text-white rounded hover:bg-green-600 border border-green-600 transition duration-300"
          >
            링크 복사
          </button>
          <button
            onClick={handleSaveResult}
            className="w-[48%] py-2 bg-blue-500 text-white rounded hover:bg-blue-600 border border-blue-600 transition duration-300"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};
