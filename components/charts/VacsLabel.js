import React from 'react'
import { func } from 'prop-types'

import { VictoryLabel, VictoryTooltip } from 'victory'

class VacsLabel extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents

  render() {
    return (
      <>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          text={this.props.tooltipLabel || this.props.text}
          orientation="right"
          flyoutStyle={{ fill: '#e2e2e2' }}
          pointerLength={6}
          constrainToVisibleArea
        />
      </>
    )
  }
}

VacsLabel.propTypes = {
  text: func,
  tooltipLabel: func,
}

export default VacsLabel
