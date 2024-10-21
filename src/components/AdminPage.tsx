import React from 'react'
import { AppConfig } from '../types'

interface AdminPageProps {
  config: AppConfig
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>
  onClose: () => void
}

export const AdminPage: React.FC<AdminPageProps> = ({ config, setConfig, onClose }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig(prevConfig => ({ ...prevConfig, [name]: value }))
  }

  return (
    <div className="w-full max-w-[600px] p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">관리자 페이지</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">상단 이미지 URL</label>
          <input
            type="text"
            name="topImage"
            value={config.topImage}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">상단 이미지 대체 텍스트</label>
          <input
            type="text"
            name="topImageAlt"
            value={config.topImageAlt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            name="title"
            value={config.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">설명</label>
          <textarea
            name="description"
            value={config.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">인용구</label>
          <textarea
            name="quote"
            value={config.quote}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">배너 이미지 URL</label>
          <input
            type="text"
            name="bannerImage"
            value={config.bannerImage}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">배너 이미지 대체 텍스트</label>
          <input
            type="text"
            name="bannerAlt"
            value={config.bannerAlt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">로고 텍스트</label>
          <input
            type="text"
            name="logoText"
            value={config.logoText}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">로고 링크</label>
          <input
            type="text"
            name="logoLink"
            value={config.logoLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
          />
        </div>
      </form>
      <button
        onClick={onClose}
        className="mt-4 bg-dark-green text-white py-2 px-4 hover:bg-green-800"
      >
        저장 및 닫기
      </button>
    </div>
  )
}