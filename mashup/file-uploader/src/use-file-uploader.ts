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

export interface CustomFile {
  id: string
  file: File
  preview: string
}

export interface CustomDropzoneState
  extends Omit<DropzoneState, 'acceptedFiles'> {
  acceptedFiles: CustomFile[]
  dialogImage: CustomFile | null
  setDialogImage: React.Dispatch<React.SetStateAction<CustomFile | null>>
  downloadFile?: (file: File) => void
  removeFile?: (id: CustomFile['id']) => void
  clearAllFiles?: () => void
}

export type FileUploaderType = (
  options?: DropzoneOptions | undefined
) => CustomDropzoneState

export const useFileUploader: FileUploaderType = options => {
  const [files, setFiles] = useState<CustomFile[]>([])
  const [dialogImage, setDialogImage] = useState<CustomFile | null>(null)

  const calculateSize = useMemo(() => {
    if (options?.maxSize) {
      return bytesToMB(options.maxSize)
    }
    return bytesToMB(10)
  }, [options?.maxSize])

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

  const downloadFile = (file: File): void => {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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

  // Cleanup function for object URLs
  const cleanupObjectURLs = useCallback(() => {
    files.forEach(({ preview }) => {
      URL.revokeObjectURL(preview)
    })
  }, [files])

  const clearAllFiles = (): void => {
    setFiles([])
    cleanupObjectURLs()
  }

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      cleanupObjectURLs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run this on unmount
  }, [])

  return {
    acceptedFiles: files,
    dialogImage,
    setDialogImage,
    downloadFile,
    removeFile,
    clearAllFiles,
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
