import { ResponsivePie } from "@nivo/pie";

export const CircularGraph = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    sortByValue={true}
    innerRadius={0.5}
    padAngle={3}
    fit={false}
    borderWidth={1}
    cornerRadius={3}
    colors={{ datum: "data.color" }}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLinkLabels={false}
    enableArcLabels={false}
  />
);
