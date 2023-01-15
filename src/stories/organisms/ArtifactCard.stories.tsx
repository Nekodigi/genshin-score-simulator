import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArtifactCard from "../../components/organisms/ArtifactCard";
import { ArtifactCardLegacy } from "../../components/organisms/ArtifactCardLegacy";

export default {
  title: "Organisms/ArtifactCard",
  component: ArtifactCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArtifactCard>;

const Template: ComponentStory<typeof ArtifactCard> = (args) => (
  <ArtifactCard {...args} />
);
export const Default = Template.bind({});

Default.args = {
  artifact: {
    level: 0,
    substats: [
      { key: "HP ", value: 1 },
      { key: "HP ", value: 1 },
      { key: "HP ", value: 1 },
      { key: "HP ", value: 1 },
    ],
  },
};
