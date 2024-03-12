/* eslint-disable no-console -- TEMP */
import type { Meta, StoryObj } from '@storybook/react'
import FileUploader from '@utopia/file-uploader'

const meta: Meta<typeof FileUploader> = {
  component: FileUploader
}

export default meta

type Story = StoryObj<typeof FileUploader>

export const Default: Story = {
  render: () => (
    <FileUploader
      onFilesUpload={async files => {
        // Mocking async upload
        await new Promise(resolve => {
          setTimeout(resolve, 10000) // Simulate 10-seconds delay
        })
        console.log('onFilesUpload callback:', files)

        // Simulate potential error
        throw new Error('Upload failed, yohow!') // Uncomment this line to test error handling
      }}
    />
  )
}
