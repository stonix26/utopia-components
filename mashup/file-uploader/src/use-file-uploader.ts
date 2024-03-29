/* eslint-disable no-console -- TEMP */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { type Area, type Point } from 'react-easy-crop'
import { getCroppedImg } from './get-cropped-img'
import type { CustomFile, FileUploaderHook, FileWithPreview } from './types'
import { bytesToMB, convertBlobUrlToOriginalFileType } from './helpers'

export const useFileUploader: FileUploaderHook = options => {
  const [filesWithBlob, setFilesWithBlob] = useState<FileWithPreview[]>([])
  const [files, setFiles] = useState<CustomFile[]>([])
  const [dialogImage, setDialogImage] = useState<FileWithPreview | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  // Cropper states
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = (
    paramCroppedArea: Area,
    paramCroppedAreaPixels: Area
  ): void => {
    setCroppedAreaPixels(paramCroppedAreaPixels)
  }

  const mergeCroppedImage = async (): Promise<void> => {
    try {
      if (croppedAreaPixels) {
        const croppedImage: string | null = (await getCroppedImg(
          dialogImage?.preview || '',
          croppedAreaPixels,
          rotation
        )) as string | null

        setFilesWithBlob(prevFiles =>
          prevFiles.map(item =>
            item.file === dialogImage?.file
              ? { ...item, preview: croppedImage || '' }
              : item
          )
        )
        setDialogImage(null)
        setIsCropping(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

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
        setFilesWithBlob(prevFiles => [
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
    accept: options?.accept,
    onDrop,
    ...options,
    disabled: options?.disabled || false,
    maxSize: calculateSize
  })

  const acceptedFileTypesStr = useMemo(() => {
    const acceptedFileTypes = options?.accept
    if (acceptedFileTypes) {
      const result = Object.keys(acceptedFileTypes)
        .map(key => {
          const extensions = acceptedFileTypes[key]
          if (extensions.length === 0) {
            return key
          }
          return [...extensions].join(', ')
        })
        .join(', ')
      return result
    }
    return 'All files'
  }, [options?.accept])

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

  const removeFile = (id: FileWithPreview['id']): void => {
    setFilesWithBlob(prevFiles => {
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
    filesWithBlob.forEach(({ preview }) => {
      URL.revokeObjectURL(preview)
    })
  }, [filesWithBlob])

  const clearAllFiles = (): void => {
    setFilesWithBlob([])
    cleanupObjectURLs()
  }

  useEffect(() => {
    return () => {
      cleanupObjectURLs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run this on unmount
  }, [])

  useEffect(() => {
    const updateFiles = async (): Promise<void> => {
      const updatedFiles = await Promise.all(
        filesWithBlob.map(async item => {
          const file = await convertBlobUrlToOriginalFileType(
            item.preview,
            item.file.name
          )
          return { id: item.id, file: file || item.file }
        })
      )
      setFiles(updatedFiles)
    }
    void updateFiles()
  }, [filesWithBlob])

  return {
    // Custom
    withBlobFiles: filesWithBlob,
    files,
    dialogImage,
    setDialogImage,
    isCropping,
    setIsCropping,
    crop,
    setCrop,
    onCropComplete,
    zoom,
    setZoom,
    rotation,
    setRotation,
    mergeCroppedImage,
    downloadFile,
    removeFile,
    clearAllFiles,

    // Dropzone
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
    rootRef,

    // Other states
    disabled: options?.disabled || false,

    // Some states
    acceptedFileTypes: acceptedFileTypesStr
  }
}
