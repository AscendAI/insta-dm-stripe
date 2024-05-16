import React from 'react'

const DownloadPage = () => {
  return (
    <div className="  text-white flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-10">Download InstaDm</div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center bg-gray-800 p-20 rounded-lg glassmorphic hover:border">
          <div className="flex items-center justify-center mb-5">
            <img src="/windows.png" alt="Windows" className="h-16" />
          </div>
          <div className="text-2xl mb-5">Windows</div>
          <a href="https://github.com/AscendAI/slyte-zero-updater/releases/download/v1.2.13/InstaDm-Setup-1.2.13.exe">
            <button
              className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              windows 64
            </button>
          </a>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800 p-10 rounded-lg glassmorphic hover:border">
          <div className="flex items-center justify-center mb-5">
            <img src="/mac.png" alt="Mac" className="h-16" />
          </div>
          <div className="text-2xl mb-5">Mac</div>
          <a href="https://github.com/AscendAI/slyte-zero-updater/releases/download/v1.2.13/InstaDm-1.2.13-universal.dmg">
            <button
              className="mt-4 bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              mac
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage
