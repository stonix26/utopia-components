/* eslint-disable no-console -- TEMP */
import type { Meta, StoryObj } from '@storybook/react'
import FileUploader, {
  type FileUploaderProps,
  useFileUploader
} from '@utopia/file-uploader'
import { Button } from '@utopia/radix-button'
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
  const states = useFileUploader({
    accept: {
      'image/*': []
    }
  })

  const selectedFiles = states.acceptedFiles

  const handleUpload = async () => {
    // Set loading states here
    const formData = new FormData()
    for (const customFile of selectedFiles) {
      formData.append('files', customFile.file)
    }
    try {
      console.log('Uploading files:', selectedFiles)
      await axios.post(MOCK_SERVER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Files uploaded successfully!')
    } catch (error: Error | unknown) {
      console.error('Upload failed:', error)
    }
  }

  console.log('states', states)

  return (
    <div>
      <FileUploader {...args} configParams={states} />
      <Button disabled={selectedFiles.length === 0} onClick={handleUpload}>
        Upload files
      </Button>
    </div>
  ) as Story['args']
}
