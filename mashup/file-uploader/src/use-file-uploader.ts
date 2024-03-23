/* eslint-disable no-console -- TEMP */
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  type DropzoneOptions,
  type DropzoneState,
  useDropzone
} from 'react-dropzone'

export function bytesToMB(size: number): number {
  return size * 1024 * 1024
}

interface CustomFile {
  id: string
  file: File
  preview: string
}

interface CustomDropzoneState extends Omit<DropzoneState, 'acceptedFiles'> {
  acceptedFiles: CustomFile[]
  removeFile?: (id: CustomFile['id']) => void
}

type FileUploaderType = (
  options?: DropzoneOptions | undefined
) => CustomDropzoneState

export const useFileUploader: FileUploaderType = options => {
  const [files, setFiles] = useState<CustomFile[]>([])

  const calculateSize = useMemo(() => {
    if (options?.maxSize) {
      return bytesToMB(options.maxSize)
    }
    return bytesToMB(10)
  }, [options?.maxSize])

  const removeFile = (id: CustomFile['id']): void => {
    setFiles(prevFiles => {
      const preview = prevFiles.find(item => item.id === id)?.preview
      const filter = prevFiles.filter(item => item.id !== id)
      if (preview) {
        URL.revokeObjectURL(preview)
        return filter
      }
      return filter
    })
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => {
        console.error(`File reading of ${file.name} was aborted!`)
      }
      reader.onerror = () => {
        console.error(`File reading of ${file.name} has failed!`)
      }
      reader.onloadstart = () => {
        console.info(`File reading of ${file.name} was started...`)
      }
      reader.onprogress = () => {
        console.info(`File reading of ${file.name} is in progress...`)
      }
      reader.onload = () => {
        // Do whatever you want with the file contents
        setFiles(prevFiles => [
          ...prevFiles,
          {
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file)
          }
        ])
      }
      reader.onloadend = () => {
        console.info(`File reading of ${file.name} ends.`)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const {
    fileRejections,
    getInputProps,
    getRootProps,
    inputRef,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFileDialogActive,
    isFocused,
    open,
    rootRef
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    ...options,
    maxSize: calculateSize
  })

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(({ preview }) => {
        URL.revokeObjectURL(preview)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run this on unmount
  }, [])

  return {
    acceptedFiles: files,
    removeFile,
    fileRejections,
    getInputProps,
    getRootProps,
    inputRef,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFileDialogActive,
    isFocused,
    open,
    rootRef
  }
}
