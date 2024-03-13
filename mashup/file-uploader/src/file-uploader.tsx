import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileRejection, type Accept, useDropzone } from 'react-dropzone'
import { Button } from '@utopia/radix-button'
import { FileText, UploadCloud } from 'lucide-react'

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
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
  // onFilesUpload,
  onFilesSelected,
  maxSize = 10,
  accept = {
    'image/*': [],
    'application/pdf': ['.pdf', '.doc', '.docx', '.xlsx']
  },
  disabled
}: FileUploaderProps): JSX.Element {
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string }[]
  >([])
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFilesArg: FileRejection[]) => {
      setPreviewFiles(
        acceptedFiles.map(file => ({
          file,
          preview: URL.createObjectURL(file)
        }))
      )
      setRejectedFiles(rejectedFilesArg)
    },
    []
  )

  const computedMaxSize = useCallback(() => {
    return maxSize * 1024 * 1024
  }, [maxSize])

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop,
    accept,
    maxSize: computedMaxSize(),
    validator: file => typeValidator(file, maxSize),
    disabled
  })

  const errorMessage = useMemo(() => {
    if (rejectedFiles.length === 0) return null
    return (
      <div className="text-xs">
        {rejectedFiles.map(rejected => (
          <div key={rejected.file.name}>
            <p>{rejected.file.name}</p>
            <ul className="ml-6 list-disc">
              {rejected.errors
                .filter(f => f.code.startsWith('utopia-'))
                .map((ferr, i) => (
                  // eslint-disable-next-line react/no-array-index-key -- TEMP
                  <li className="text-destructive" key={i}>
                    {ferr.message}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }, [rejectedFiles])

  const handleRemovePreview = (file: File): void => {
    setPreviewFiles(prevFiles => prevFiles.filter(item => item.file !== file))
  }

  // Call the onFilesSelected callback with the selected files when files are dropped or selected
  useEffect(() => {
    const files = previewFiles.map(({ file }) => file)
    onFilesSelected(files)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Removed `onFilesSelected` as deps causing rerenders
  }, [previewFiles])

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
    <div className="space-y-2">
      <div
        {...getRootProps({
          className:
            'flex flex-col items-center justify-center gap-y-2 rounded border-2 border-dashed border-border p-4'
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-12 w-12 text-secondary" />
        <p className="text-sm">{`Drag 'n' drop some files here`}</p>
        <Button onClick={open} size="xs" variant="secondary">
          Choose File
        </Button>
      </div>
      {previewFiles.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <div className="flex gap-x-2">
            {previewFiles.map(({ file, preview }) => (
              <div className="relative" key={file.name}>
                {file.type.startsWith('image/') ? (
                  <img
                    alt={file.name}
                    className="object-fit h-32 w-32"
                    src={preview}
                  />
                ) : (
                  <div className="flex h-32 w-32 flex-col items-center items-center justify-center justify-center gap-y-2 rounded border border-border p-4">
                    <FileText className="h-16 w-16 text-secondary" />
                    <p className="line-clamp-1 text-xs">{file.name}</p>
                  </div>
                )}

                <button
                  className="absolute right-0 top-0 rounded-md bg-destructive px-1 text-xs text-white"
                  onClick={() => {
                    handleRemovePreview(file)
                  }}
                  type="button"
                >
                  x
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
