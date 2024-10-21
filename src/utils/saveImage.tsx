import html2canvas from 'html2canvas';

export const saveElementAsImage = async (element: HTMLElement, fileName: string) => {
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      scale: 2, // 적당한 해상도를 위해 2배로 설정
    });
    const processedCanvas = processCanvas(canvas);
    const image = processedCanvas.toDataURL('image/png', 1.0);
    
    const link = document.createElement('a');
    link.download = fileName;
    link.href = image;
    link.click();
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

const processCanvas = (originalCanvas: HTMLCanvasElement): HTMLCanvasElement => {
  const targetWidth = 400;
  const cropHeight = 275; // 하단에서 제외할 픽셀 수
  const originalAspectRatio = originalCanvas.width / originalCanvas.height;
  const targetHeight = Math.round((originalCanvas.height - cropHeight / 2) * (targetWidth / originalCanvas.width));
  
  const processedCanvas = document.createElement('canvas');
  processedCanvas.width = targetWidth;
  processedCanvas.height = targetHeight;
  const ctx = processedCanvas.getContext('2d');
  
  if (ctx) {
    // 배경을 흰색으로 채우기
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    
    // 원본 캔버스를 새 캔버스에 그리기 (하단 74픽셀 제외)
    const sourceHeight = originalCanvas.height - cropHeight / 2;
    ctx.drawImage(
      originalCanvas,
      0, 0, originalCanvas.width, sourceHeight, // 소스 영역
      0, 0, targetWidth, targetHeight // 대상 영역
    );
    
    // 캔버스 테두리에 얇은 선 추가
    ctx.strokeStyle = '#e2e8f0'; // 연한 회색
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, targetWidth, targetHeight);
  }
  
  return processedCanvas;
};