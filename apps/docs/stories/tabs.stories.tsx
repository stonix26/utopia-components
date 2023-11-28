import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@utopia/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@utopia/card'
import { Input } from '@utopia/input'
import { Label } from '@utopia/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@utopia/tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: args => (
    <Tabs {...args}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue="Pedro Duarte" id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input defaultValue="@peduarte" id="username" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  args: {
    className: 'w-[400px]',
    defaultValue: 'account'
  }
}
