/* eslint-disable no-console -- TEMP */
import type { Meta, StoryObj } from '@storybook/react'
import FileUploader, { useFileUploader } from '@utopia/file-uploader'

const meta: Meta<typeof FileUploader> = {
  component: FileUploader
}

export default meta
type Story = StoryObj<typeof FileUploader>

export const Default = (args: Story['args']) => {
  const states = useFileUploader({
    accept: {
      'image/*': []
    }
  })

  console.log('states', states)

  return (<FileUploader {...args} dropzone={states} />) as Story['args']
}
