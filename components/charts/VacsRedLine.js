import { number } from 'prop-types'

import { VictoryLabel, VictoryLine } from 'victory'

import { colors } from '../../styles/_theme'

const VacsRedLine = ({ labelY = 80, ...props }) => (
  <VictoryLine
    {...props}
    style={{
      data: {
        stroke: colors.CanadaRed,
        strokeWidth: 0.5,
        strokeDasharray: '4, 4',
      },
      labels: { angle: 0, fill: colors.CanadaRed, fontSize: 8, padding: 5 },
    }}
    labels={['September 13']}
    labelComponent={<VictoryLabel y={labelY} />}
    y={() => 70}
  />
)

VacsRedLine.propTypes = {
  labelY: number,
}
