import { array, number, string } from 'prop-types'

import { VictoryLabel, VictoryLine } from 'victory'

import { colors } from '../../styles/_theme'

const VacsRedLine = ({ labelY = 83, y = 70, labels, textAnchor = 'start', ...props }) => (
  <VictoryLine
    {...props}
    style={{
      data: {
        stroke: colors.CanadaRed,
        strokeWidth: 0.5,
        strokeDasharray: '4, 4',
      },
      labels: {
        angle: 0,
        fill: colors.CanadaRed,
        fontSize: 8,
        padding: textAnchor === 'start' ? 5 : 28.5,
      },
    }}
    labels={labels || ['Labour Day\n(Sept 6)']}
    labelComponent={<VictoryLabel y={labelY} textAnchor={textAnchor} />}
    y={() => y}
  />
)

VacsRedLine.propTypes = {
  labels: array,
  labelY: number,
  textAnchor: string,
  y: number,
}

export default VacsRedLine
