import type { Meta, StoryObj } from '@storybook/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@utopia/radix-form'
import { Checkbox } from '@utopia/radix-checkbox'
import { Button } from '@utopia/radix-button'
import { toast } from '@utopia/radix-toast'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: args => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="terms"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  args: {
    id: 'terms'
  }
}

export const WithText: Story = {
  render: args => (
    <div className="items-top flex space-x-2">
      <Checkbox {...args} />
      <div className="grid gap-1.5 leading-none">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="terms1"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
  args: {
    id: 'terms1'
  }
}

export const Disabled: Story = {
  render: args => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="terms2"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  args: {
    id: 'terms2',
    disabled: true
  }
}

// FORMS

const FormSchema = z.object({
  mobile: z.boolean().default(false).optional()
})

type TFormSchema = z.infer<typeof FormSchema>

export function FormSingle(): JSX.Element {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: true
    }
  })

  const onSubmit: SubmitHandler<TFormSchema> = (data: TFormSchema) => {
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
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{' '}
                  <a href="/examples/forms">mobile settings</a> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const items = [
  {
    id: 'recents',
    label: 'Recents'
  },
  {
    id: 'home',
    label: 'Home'
  },
  {
    id: 'applications',
    label: 'Applications'
  },
  {
    id: 'desktop',
    label: 'Desktop'
  },
  {
    id: 'downloads',
    label: 'Downloads'
  },
  {
    id: 'documents',
    label: 'Documents'
  }
] as const

const FormSchema2 = z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})

export function FormMultiple(): JSX.Element {
  const form = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      items: ['recents', 'home']
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema2>): void {
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
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map(item => (
                <FormField
                  control={form.control}
                  key={item.id}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex flex-row items-start space-x-3 space-y-0"
                        key={item.id}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={checked => {
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value.filter(
                                      value => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
