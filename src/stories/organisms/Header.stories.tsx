import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "../../components/organisms/Header";

export default {
  title: "Organisms/Header",
  component: Header,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Header>;

//const Template: ComponentStory<typeof Header> = (args) => <Header />;
export const Default = () => <Header />;
// export const Primary = Template.bind({});
// Primary.args = {};
