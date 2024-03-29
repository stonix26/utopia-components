import {
  Crop,
  Download,
  ExternalLink,
  Image,
  Trash,
  UploadCloud
} from 'lucide-react'
import { Button } from '@utopia/radix-button'
import { ScrollArea, ScrollBar } from '@utopia/radix-scroll-area'
import { cn } from '@utopia/classnames'
import Dialog from './dialog'
import FilePreview from './file-preview'
import type { FileUploaderProps } from './types'

function FileUploader({
  configParams: {
    getInputProps,
    getRootProps,
    open,
    withBlobFiles,
    fileRejections,

    // Dialog props
    dialogImage,
    setDialogImage,

    // Cropper props
    isCropping,
    setIsCropping,
    crop,
    setCrop,
    rotation,
    setRotation,
    zoom,
    setZoom,
    onCropComplete,
    mergeCroppedImage,

    // Option props
    downloadFile,
    removeFile,
    clearAllFiles,

    // Other props
    disabled,
    acceptedFileTypes
  },
  className,
  ...props
}: FileUploaderProps): JSX.Element {
  return (
    <>
      <div className={cn('flex w-full flex-col gap-y-2', className)} {...props}>
        <div
          {...getRootProps({
            className:
              'flex h-48 flex-col items-center justify-center rounded border-2 border-dashed border-border bg-background'
          })}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-12 w-12 text-input" />
          <div className="text-center">
            <p className="font-semibold text-primary">{`Drag 'n' drop some files here`}</p>
            <p className="text-xs text-secondary-foreground">
              File Supported: {acceptedFileTypes}
            </p>
          </div>
          <Button
            className="my-4"
            disabled={disabled}
            onClick={open}
            size="xs"
            type="button"
            variant="secondary"
          >
            Choose File
          </Button>
        </div>
        {withBlobFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-sm">
              <p>Selected Files:</p>
              <button
                disabled={disabled}
                onClick={() => {
                  if (clearAllFiles) {
                    clearAllFiles()
                  }
                }}
                type="button"
              >
                Clear all
              </button>
            </div>
            <ScrollArea className="h-40 w-full whitespace-nowrap pb-2">
              <div className="flex w-max items-center gap-x-2">
                {withBlobFiles.map(item => {
                  const defaultOptions = [
                    {
                      id: 'remove',
                      name: 'Remove',
                      icon: Trash,
                      onClick: () => {
                        if (removeFile) {
                          removeFile(item.id)
                        }
                      }
                    },
                    {
                      id: 'crop',
                      name: 'Crop',
                      icon: Crop,
                      onClick: () => {
                        setDialogImage(item)
                        setIsCropping(true)
                      }
                    },
                    {
                      id: 'preview',
                      name: 'Preview',
                      icon: Image,
                      onClick: () => {
                        setDialogImage(item)
                      }
                    },
                    {
                      id: 'download',
                      name: 'Download',
                      icon: Download,
                      onClick: () => {
                        if (downloadFile) {
                          downloadFile(item.file)
                        }
                      }
                    },
                    {
                      id: 'newTab',
                      name: 'Open in new tab',
                      icon: ExternalLink,
                      onClick: () => {
                        window.open(item.preview, '_blank')
                      }
                    }
                  ]

                  const noPreviewAndCropOptions = defaultOptions.filter(
                    o => o.id !== 'preview' && o.id !== 'crop'
                  )

                  const isImg = item.file.type.startsWith('image/')
                  return (
                    <FilePreview
                      disabled={disabled}
                      file={item.file}
                      key={item.id}
                      onPreviewClick={() => {
                        if (isImg) {
                          setDialogImage(item)
                        }
                      }}
                      options={isImg ? defaultOptions : noPreviewAndCropOptions}
                      preview={item.preview}
                    />
                  )
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
        <ul className="list-outside list-disc px-2 text-xs text-secondary">
          {fileRejections.map(({ file, errors }) => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
              <ul className="text-danger ml-2 list-outside list-disc text-xs">
                {errors.map(e => (
                  <li key={e.code}>{e.message}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        crop={crop}
        dialogImage={dialogImage}
        isCropping={isCropping}
        mergeCroppedImage={mergeCroppedImage}
        onCropComplete={onCropComplete}
        onOpenChange={prev => {
          setDialogImage(null)
          setIsCropping(false)
          !prev
        }}
        open={dialogImage !== null}
        rotation={rotation}
        setCrop={setCrop}
        setRotation={setRotation}
        setZoom={setZoom}
        zoom={zoom}
      />
    </>
  )
}

export default FileUploader
