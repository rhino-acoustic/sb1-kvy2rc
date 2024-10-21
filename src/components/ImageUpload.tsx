import React, { useState, useCallback, useRef, useEffect } from 'react'

interface ImageUploadProps {
  onImageCropped: (croppedImage: string) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageCropped }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isApplied, setIsApplied] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '')
        setIsApplied(false)
        setScale(1)
        setPosition({ x: 0, y: 0 })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = useCallback(() => {
    if (imgRef.current && containerRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current
      const containerSize = containerRef.current.offsetWidth
      const imageAspectRatio = naturalWidth / naturalHeight

      let newScale: number
      let newX: number
      let newY: number

      if (imageAspectRatio > 1) {
        // 이미지가 더 넓은 경우
        newScale = containerSize / naturalHeight
        newX = (containerSize - naturalWidth * newScale) / 2
        newY = 0
      } else {
        // 이미지가 더 높은 경우
        newScale = containerSize / naturalWidth
        newX = 0
        newY = (containerSize - naturalHeight * newScale) / 2
      }

      setScale(newScale)
      setPosition({ x: newX, y: newY })
    }
  }, [])

  useEffect(() => {
    if (imgSrc) {
      const img = new Image()
      img.onload = onImageLoad
      img.src = imgSrc
    }
  }, [imgSrc, onImageLoad])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY * -0.01
    const newScale = Math.max(0.1, Math.min(10, scale + delta))
    
    if (containerRef.current && imgRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const imgRect = imgRef.current.getBoundingClientRect()

      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      const scaleChange = newScale - scale

      const newX = position.x - (mouseX - position.x) * scaleChange / scale
      const newY = position.y - (mouseY - position.y) * scaleChange / scale

      setPosition({ x: newX, y: newY })
    }

    setScale(newScale)
  }

  const getCroppedImg = useCallback(() => {
    if (!imgRef.current || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const containerSize = containerRef.current.offsetWidth
    canvas.width = containerSize
    canvas.height = containerSize

    // 캔버스를 흰색으로 채웁니다 (투명한 부분을 방지)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(
      imgRef.current,
      -position.x / scale,
      -position.y / scale,
      containerSize / scale,
      containerSize / scale,
      0,
      0,
      containerSize,
      containerSize
    )

    const base64Image = canvas.toDataURL('image/jpeg')
    onImageCropped(base64Image)
    setIsApplied(true)
  }, [scale, position, onImageCropped])

  return (
    <div className="mb-4">
      <p className="mb-2 text-xs text-gray-600">결과를 확인할 수 있는 이미지를 업로드 해주세요 (ex: 나이키앱, 가민 등)</p>
      <input 
        type="file" 
        accept="image/*" 
        onChange={onSelectFile} 
        className="mb-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-dark-green file:text-white hover:file:bg-green-800"
      />
      {!!imgSrc && (
        <div className="mt-4 flex flex-col items-center">
          <div 
            ref={containerRef}
            className="w-[90%] aspect-square overflow-hidden relative border border-gray-300"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                maxWidth: 'none',
              }}
            />
          </div>
          <button
            onClick={getCroppedImg}
            className={`mt-2 py-2 px-4 w-[90%] ${
              isApplied
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-dark-green hover:bg-green-800'
            } text-white transition-colors duration-200`}
          >
            {isApplied ? '적용됨' : '이미지 적용'}
          </button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}