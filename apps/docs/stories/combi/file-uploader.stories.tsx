/* eslint-disable no-console -- TEMP */
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FileUploader, {
  type FileUploaderProps,
  useFileUploader
} from '@utopia/file-uploader'
import { Button } from '@utopia/radix-button'
import { UploadCloud } from 'lucide-react'
import axios from 'axios'

const meta: Meta<typeof FileUploader> = {
  component: FileUploader
}

export default meta
type Story = StoryObj<typeof FileUploader>

const MOCK_SERVER = 'http://localhost:3000/upload' // Replace with your server URL

export const Default = (
  args: Story['args']
): Partial<FileUploaderProps> | undefined => {
  const [isUploading, setIsUploading] = useState(false)

  const states = useFileUploader({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.avi', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.flac'],
      'application/*': [
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.ppt',
        '.pptx'
      ],
      'text/*': ['.txt', '.md', '.json', '.csv']
    },
    maxSize: 200,
    disabled: isUploading
  })

  const files = states.files

  const handleUpload = async (): Promise<void> => {
    if (files.length === 0) {
      console.log('No files to upload!')
      return
    }

    const formData = new FormData()
    for (const customFile of files) {
      formData.append('files', customFile.file)
    }
    try {
      // Mock upload time for testing purposes
      setIsUploading(true)
      await new Promise(resolve => {
        setTimeout(resolve, 2000)
      })

      console.log('Uploading files:', files)
      await axios.post(MOCK_SERVER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setIsUploading(false)
      if (states.clearAllFiles) {
        states.clearAllFiles()
      }
      console.log('Files uploaded successfully!')
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- TEMP
    } catch (error: Error | unknown) {
      setIsUploading(false)
      console.error('Upload failed:', error)
    }
  }

  console.log('useMultifileUpload', states)

  return (
    <div className="flex w-full flex-col items-center">
      <FileUploader {...args} className="mb-4" configParams={states} />
      <Button
        disabled={isUploading || files.length === 0}
        onClick={handleUpload}
      >
        <UploadCloud className="mr-2 h-4 w-4" />
        Upload files
      </Button>
    </div>
  ) as Story['args']
}
