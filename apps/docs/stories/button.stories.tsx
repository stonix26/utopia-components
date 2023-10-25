import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@utopia/button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (props) => <Button {...props} />,
  name: "Button",
  args: {
    children: "Hello",
    type: "button",
    onClick: () => {
      // eslint-disable-next-line no-alert -- testing only
      alert("Hello from Turborepo!");
    },
  },
};
