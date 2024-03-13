/* eslint-disable no-console -- TEMP */
import type { Meta } from '@storybook/react'
import FileUploader from '@utopia/file-uploader'
import { useState } from 'react'

const meta: Meta<typeof FileUploader> = {
  component: FileUploader
}

export default meta

export function Default(): JSX.Element {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
  }

  // const handleFilesSelected = useCallback((files: File[]) => {
  //   setSelectedFiles(files)
  // }, [])

  const handleUpload = async (): Promise<void> => {
    setUploading(true)
    try {
      // Simulate an async upload process
      await new Promise(res => {
        setTimeout(res, 2000)
      })

      // Actual upload logic can be implemented here
      console.log('Uploading files:', selectedFiles)

      // Simulate success
      setUploading(false)
      setUploadError(null)
    } catch (error) {
      // Simulate error
      setUploadError('Upload failed')
      setUploading(false)
    }
  }

  return (
    <div>
      <FileUploader
        disabled={uploading}
        onFilesSelected={handleFilesSelected}
      />
      {selectedFiles.length > 0 ? (
        <div>
          <button disabled={uploading} onClick={handleUpload} type="button">
            {uploading
              ? 'Uploading...'
              : `Upload ${selectedFiles.length} files`}
          </button>
        </div>
      ) : null}
      {uploadError ? (
        <div>
          <p>{uploadError}</p>
        </div>
      ) : null}
    </div>
  )
}
