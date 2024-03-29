import type { Meta, StoryObj } from '@storybook/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@utopia/radix-input'
import { Button } from '@utopia/radix-button'
import { toast } from '@utopia/radix-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@utopia/radix-form'

const meta: Meta<typeof Input> = {
  component: Input
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: args => <Input {...args} />,
  args: {
    type: 'email',
    placeholder: 'Email'
  }
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

function InputForm(): JSX.Element {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="stonix26" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const InputFormStory: StoryObj<typeof InputForm> = {
  render: () => <InputForm />,
  name: 'Form'
}
