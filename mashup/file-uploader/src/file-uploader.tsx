import { useState } from 'react'
import { FileText, UploadCloud } from 'lucide-react'
import { Button } from '@utopia/radix-button'
import Dialog from './dialog'
import type { CustomFile, useFileUploader } from './use-file-uploader'

export interface FileUploaderProps {
  configParams: ReturnType<typeof useFileUploader>
}

function FileUploader({
  configParams: {
    getInputProps,
    getRootProps,
    acceptedFiles,
    open,
    downloadFile,
    removeFile,
    clearAllFiles
  }
}: FileUploaderProps): JSX.Element {
  const [dialogImage, setDialogImage] = useState<CustomFile | null>(null)
  return (
    <>
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
        {acceptedFiles.length > 0 && (
          <div>
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
            <div className="flex gap-x-2">
              {acceptedFiles.map(({ file, id, preview }) => (
                <div className="relative flex flex-col" key={id}>
                  {file.type.startsWith('image/') ? (
                    <button
                      onClick={() => {
                        setDialogImage({ file, id, preview })
                      }}
                      type="button"
                    >
                      <img
                        alt={file.name}
                        className="h-32 w-32 object-cover"
                        src={preview}
                      />
                    </button>
                  ) : (
                    <div className="flex h-32 w-32 flex-col items-center items-center justify-center justify-center gap-y-2 rounded border border-border p-4">
                      <FileText className="h-16 w-16 text-secondary" />
                      <p className="line-clamp-1 text-xs">{file.name}</p>
                    </div>
                  )}

                  <button
                    className="absolute right-0 top-0 rounded-md bg-destructive px-1 text-xs text-white"
                    onClick={() => {
                      if (removeFile) {
                        removeFile(id)
                      }
                    }}
                    type="button"
                  >
                    x
                  </button>

                  <button
                    onClick={() => {
                      if (downloadFile) {
                        downloadFile(file)
                      }
                    }}
                    type="button"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
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
