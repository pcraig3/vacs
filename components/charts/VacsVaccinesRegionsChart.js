import { array, object, oneOfType } from 'prop-types'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLegend } from 'victory'

import VacsRedLine from './VacsRedLine'
import VacsLabel from './VacsLabel'
import { animateBar, colors, theme } from '../../styles/_theme'
import { getRegionTooltip } from '../../utils/charts'

import { getDaysData, getRegionVaccines } from '../../data'

const VacsVaccinesRegionsChart = ({ children, data }) => {
  return (
    <figure>
      <figcaption>{children}</figcaption>
      <div className="chart">
        <VictoryChart
          height={350}
          width={280}
          domainPadding={10}
          theme={theme}
          containerComponent={
            <VictoryContainer
              style={{
                userSelect: 'auto',
                touchAction: 'auto',
              }}
            />
          }
        >
          <VictoryLegend
            colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
            data={[{ name: 'Canadians vaccinated*' }, { name: 'Days in 2021' }]}
          />
          <VictoryAxis fixLabelOverlap={true} />
          <VictoryAxis
            dependentAxis
            domain={[0, 100]}
            tickValues={[getDaysData('CAN')[0].y, 50, 70, 100]}
            tickFormat={(t) => `${t}%`}
            orientation="bottom"
          />
          <VictoryBar
            animate={animateBar}
            horizontal
            name="bar-vaccines"
            data={getRegionVaccines({ data })}
            labels={({ datum }) => `${datum.y}%`}
            style={{
              data: {
                width: 10,
                fill: ({ datum }) => datum.fill || colors.QcOrangeAccent,
              },
            }}
            labelComponent={
              <VacsLabel
                tooltipLabel={(label) => getRegionTooltip({ abbr: label.datum.x, data })}
              />
            }
          />
          <VacsRedLine labelY={253} />
        </VictoryChart>
      </div>
    </figure>
  )
}

VacsVaccinesRegionsChart.propTypes = {
  children: oneOfType([array, object]).isRequired,
  data: array,
}

export default VacsVaccinesRegionsChart
