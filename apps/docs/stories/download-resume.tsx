import React from 'react'
import { Download } from 'lucide-react'

function DownloadResume(): JSX.Element {
  const handleDownload = (): void => {
    const pdfUrl = '/resume/RustonEmperua.pdf' // Path to your PDF file
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `RustonEmperua-${Date.now()}.pdf` // Name of the downloaded file
    link.click()
  }

  return (
    <button
      className="flex items-center gap-x-1 text-xs"
      onClick={handleDownload}
      type="button"
    >
      <Download className="h-3 w-3" />
      Resume
    </button>
  )
}

export default DownloadResume
