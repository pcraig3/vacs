import { array, object, oneOfType, shape, string } from 'prop-types'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory'

import VacsRedLine from './VacsRedLine'
import VacsLabel from './VacsLabel'
import { animateBar, colors, theme } from '../../styles/_theme'
import {
  getDaysLabel,
  getFullLabel,
  getVaccinesLabel,
  getDaysTooltip,
  getFullTooltip,
  getRegionTooltip,
} from '../../utils/charts'

const VacsVaccinesDaysChart = ({
  children,
  data: { days, vaccines, full },
  demonym = 'Canadians',
}) => (
  <figure>
    <figcaption>{children}</figcaption>
    <div className="chart">
      <VictoryChart height={154} width={360} theme={theme}>
        <VictoryLegend
          colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
          data={[{ name: `${demonym} vaccinated*` }, { name: 'Days in 2021' }]}
        />
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          domain={[0, 100]}
          tickValues={[days[0].y, 50, 70, 100]}
          tickFormat={(t) => `${t}%`}
          orientation="bottom"
        />
        <VictoryGroup
          horizontal
          offset={18}
          style={{
            data: { width: 10 },
          }}
          colorScale={[colors.QcBlueLight, colors.QcOrangeAccent]}
        >
          <VictoryBar
            name="bar-days"
            animate={animateBar}
            data={days}
            labels={getDaysLabel}
            labelComponent={<VacsLabel tooltipLabel={() => getDaysTooltip()} />}
          />
          <VictoryBar
            animate={animateBar}
            name="bar-vaccines"
            data={vaccines}
            labels={getVaccinesLabel}
            labelComponent={<VacsLabel tooltipLabel={(label) => getRegionTooltip(label.datum.x)} />}
          />
          <VictoryBar
            animate={animateBar}
            name="bar-two"
            data={full}
            labels={getFullLabel}
            labelComponent={<VacsLabel tooltipLabel={(label) => getFullTooltip(label.datum.x)} />}
          />
        </VictoryGroup>
        <VacsRedLine />
      </VictoryChart>
    </div>
  </figure>
)

VacsVaccinesDaysChart.propTypes = {
  children: oneOfType([array, object]).isRequired,
  data: shape({
    days: array,
    full: array,
    vaccines: array,
  }),
  demonym: string,
}

export default VacsVaccinesDaysChart
