import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileRejection, type Accept, useDropzone } from 'react-dropzone'
import { Button } from '@utopia/radix-button'

interface FileUploaderProps {
  onFilesUpload: (files: File[]) => Promise<void>
  maxSize?: number | undefined
  accept?: Accept | undefined
  disabled?: boolean | undefined
}

// TODO - Enhance this
const typeValidator = (
  file: File,
  maxSize: number
): {
  code: string
  message: string
} | null => {
  if (file.type.startsWith('video/')) {
    if (file.size > maxSize * 1024 * 1024) {
      return {
        code: 'utopia-size-too-large',
        message: `Video file is larger than ${maxSize}MB`
      }
    }
  } else if (file.type.startsWith('image/')) {
    if (file.size > maxSize * 1024 * 1024) {
      return {
        code: 'utopia-size-too-large',
        message: `Image file is larger than ${maxSize}MB`
      }
    }
  }
  return null
}

function FileUploader({
  onFilesUpload,
  maxSize = 3,
  accept = {
    'image/*': [],
    'application/pdf': ['.pdf']
  },
  disabled
}: FileUploaderProps): JSX.Element {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string }[]
  >([])

  const onDrop = useCallback((files: File[], rejectFiles: FileRejection[]) => {
    setUploadError(null)
    setAcceptedFiles(files)
    setPreviewFiles(
      files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
    )
    setRejectedFiles(rejectFiles)
  }, [])

  const computedMaxSize = useCallback(() => {
    return maxSize * 1024 * 1024
  }, [maxSize])

  const computedDisabled = useCallback(() => {
    return disabled || uploading
  }, [disabled, uploading])

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept,
    maxSize: computedMaxSize(),
    validator: file => typeValidator(file, maxSize),
    disabled: computedDisabled()
  })

  const errorMessage = useMemo(() => {
    if (rejectedFiles.length === 0 && !uploadError) return null
    return (
      <div style={{ color: 'red' }}>
        {rejectedFiles.map(rejected => (
          <div key={rejected.file.name}>
            <p>File Name: {rejected.file.name}</p>
            <ul>
              {rejected.errors
                .filter(f => f.code.startsWith('utopia-'))
                .map((ferr, i) => (
                  // eslint-disable-next-line react/no-array-index-key -- TEMP
                  <li key={i}>{ferr.message}</li>
                ))}
            </ul>
          </div>
        ))}
        {uploadError ? uploadError : null}
      </div>
    )
  }, [rejectedFiles, uploadError])

  const handleUpload = (): void => {
    setUploading(true)
    onFilesUpload(acceptedFiles)
      .then(() => {
        setUploading(false)
        setAcceptedFiles([])
        setPreviewFiles([])
        setUploadError(null)
      })
      .catch((error: Error) => {
        setUploadError(error.message || 'An error occured during upload.')
        setUploading(false)
      })
  }

  const handleRemovePreview = (file: File): void => {
    setUploadError(null)
    setAcceptedFiles(prevFiles => prevFiles.filter(item => item !== file))
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
        {...getRootProps({
          style: {
            border: '2px dashed #eeeeee',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '20px'
          }
        })}
      >
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop some files here`}</p>
        <Button onClick={open} variant="secondary">
          Open File Dialog
        </Button>
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
      <button
        disabled={acceptedFiles.length === 0 || uploading}
        onClick={handleUpload}
        type="button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {errorMessage}
    </div>
  )
}

export default FileUploader
