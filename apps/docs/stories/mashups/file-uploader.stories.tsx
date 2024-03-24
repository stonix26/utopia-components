/* eslint-disable no-console -- TEMP */
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
  const states = useFileUploader({
    // accept: {
    //   'image/*': []
    // },
    maxSize: 200
  })

  const selectedFiles = states.acceptedFiles

  const handleUpload = async (): Promise<void> => {
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
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- TEMP
    } catch (error: Error | unknown) {
      console.error('Upload failed:', error)
    }
  }

  console.log('states', states)

  return (
    <div className="flex w-full flex-col items-center">
      <FileUploader {...args} className="mb-4" configParams={states} />
      <Button disabled={selectedFiles.length === 0} onClick={handleUpload}>
        <UploadCloud className="mr-2 h-4 w-4" />
        Upload files
      </Button>
    </div>
  ) as Story['args']
}
