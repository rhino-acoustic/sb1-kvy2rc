import React from 'react'

interface LevelImageProps {
  percentage: number
  topPercentage: number
}

export const LevelImage: React.FC<LevelImageProps> = ({ percentage, topPercentage }) => {
  let imageSrc = ''
  let message = ''

  if (percentage >= 200) {
    imageSrc = "https://images.unsplash.com/photo-1539616246692-c7e729758570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=250&q=80"
    message = "놀라운 성과입니다!\n이봉주 선수를 뛰어넘다니!"
  } else if (percentage >= 150) {
    imageSrc = "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=250&q=80"
    message = "대단해요!\n이봉주 선수에 근접이라니!"
  } else if (percentage >= 100) {
    imageSrc = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=250&q=80"
    message = "축하합니다!\n이봉주 선수와 어깨를 나란히!!"
  } else if (percentage >= 50) {
    imageSrc = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=250&q=80"
    message = "절반을 넘었어요!\n이봉주 선수의 반을 따라잡았습니다!"
  } else {
    imageSrc = "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=250&q=80"
    message = "위대한 여정은 작은 한 걸음부터\n계속 나아가세요!"
  }

  return (
    <div className="flex flex-col items-center">
      <img src={imageSrc} alt="Level" className="w-full h-[250px] object-cover mb-4" />
      <p className="text-center text-dark-green font-bold whitespace-pre-line">{message}</p>
    </div>
  )
}