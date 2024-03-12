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
      onFilesUpload={files => {
        // eslint-disable-next-line no-console -- TEMP
        console.log('onFilesUpload callback:', files)
      }}
    />
  )
}
