import React from "react"

import { VictoryLabel, VictoryTooltip } from "victory"

class CustomLabel extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents
  render() {
    return (
      <>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          text={this.props.tooltipLabel || this.props.text}
          orientation="right"
          flyoutStyle={{ fill: "#e2e2e2" }}
          constrainToVisibleArea
        />
      </>
    )
  }
}

export default CustomLabel
