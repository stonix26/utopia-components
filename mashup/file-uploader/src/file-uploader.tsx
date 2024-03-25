import { type HTMLAttributes } from 'react'
import { Crop, Download, Trash, UploadCloud, View } from 'lucide-react'
import { Button } from '@utopia/radix-button'
import { ScrollArea, ScrollBar } from '@utopia/radix-scroll-area'
import { cn } from '@utopia/classnames'
import Dialog from './dialog'
import type { useFileUploader } from './use-file-uploader'
import FilePreview from './file-preview'

export interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {
  configParams: ReturnType<typeof useFileUploader>
}

function FileUploader({
  configParams: {
    getInputProps,
    getRootProps,
    acceptedFiles,
    open,
    dialogImage,
    setDialogImage,
    downloadFile,
    removeFile,
    clearAllFiles
  },
  className,
  ...props
}: FileUploaderProps): JSX.Element {
  return (
    <>
      <div className={cn('w-full space-y-2', className)} {...props}>
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
        {acceptedFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between">
              <p>Selected Files:</p>
              <button
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
            <ScrollArea className="h-36 w-full whitespace-nowrap pb-2">
              <div className="flex w-max items-center gap-x-2">
                {acceptedFiles.map(item => {
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
                      icon: Crop
                    },
                    {
                      id: 'preview',
                      name: 'Preview',
                      icon: View,
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
                    }
                  ]
                  const noCropOptions = defaultOptions.filter(
                    o => o.id !== 'crop'
                  )
                  const isImg = item.file.type.startsWith('image/')
                  return (
                    <FilePreview
                      file={item.file}
                      key={item.id}
                      onPreviewClick={() => {
                        if (isImg) {
                          setDialogImage(item)
                        }
                      }}
                      options={isImg ? defaultOptions : noCropOptions}
                      preview={item.preview}
                    />
                  )
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div>

      <Dialog
        fileImage={dialogImage}
        onOpenChange={prev => {
          setDialogImage(null)
          !prev
        }}
        open={dialogImage !== null}
      />
    </>
  )
}

export default FileUploader
