import { BackgroundBar, GaugeBar, PercentText } from "./prgressBar.style";
import React from "react";

export default function ProgressBar({ ratio }) {
  // console.log(ratio*100);
  return (
    <div>
      <BackgroundBar>
        <GaugeBar 
        // width="70%"
        width={`${ratio}%`}
        ></GaugeBar>
        <PercentText>{ratio}%</PercentText>
      </BackgroundBar>
    </div>
  );
}
