import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  onFilesUpload: (files: File[]) => void
  maxSize?: number | undefined
}

function FileUploader({
  onFilesUpload,
  maxSize = 10
}: FileUploaderProps): JSX.Element {
  const [errors, setErrors] = useState<string[]>([])
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string }[]
  >([])

  const validateFile = useCallback(
    (file: File) => {
      const computedMaxSize = maxSize * 1024 * 1024 // default to 10mb
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

      if (!allowedTypes.includes(file.type)) {
        setErrors(prevErrors => [
          ...prevErrors,
          `Invalid file format: ${file.name}`
        ])
        return false
      }

      if (file.size > computedMaxSize) {
        setErrors(prevErrors => [...prevErrors, `File too large: ${file.name}`])
        return false
      }

      return true
    },
    [maxSize]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter(validateFile)
      if (filteredFiles.length > 0) {
        setErrors([])
        setPreviewFiles(
          filteredFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
          }))
        )
        onFilesUpload(filteredFiles)
      }
    },
    [onFilesUpload, validateFile]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png']
    },
    maxSize: maxSize * 1024 * 1024 // default to 10mb
  })

  const errorMessage = useMemo(() => {
    if (errors.length === 0) return null
    return (
      <div style={{ color: 'red' }}>
        {errors.map((error, index) => (
          // eslint-disable-next-line react/no-array-index-key -- TEMP
          <div key={index}>{error}</div>
        ))}
      </div>
    )
  }, [errors])

  const handleRemovePreview = (file: File): void => {
    setPreviewFiles(prevFiles => prevFiles.filter(item => item.file !== file))
  }

  // Cleanup function for object URLS
  const cleanupObjectURLs = useCallback(() => {
    previewFiles.forEach(({ preview }) => {
      URL.revokeObjectURL(preview)
    })
  }, [previewFiles])

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      cleanupObjectURLs()
    }
  }, [cleanupObjectURLs])

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #eeeeee',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      {previewFiles.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {previewFiles.map(({ file, preview }) => (
              <div
                key={file.name}
                style={{ marginRight: '10px', marginBottom: '10px' }}
              >
                <img
                  alt={file.name}
                  src={preview}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                <button
                  onClick={() => {
                    handleRemovePreview(file)
                  }}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {errorMessage}
    </div>
  )
}

export default FileUploader
