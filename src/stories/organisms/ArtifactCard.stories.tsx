import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArtifactCard from "../../components/organisms/ArtifactCard";

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
  place: 1,
  score: { minScore: 1, avgScore: 2, maxScore: 3 },
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
