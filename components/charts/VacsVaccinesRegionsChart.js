import { array, object, oneOfType, number } from 'prop-types'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLegend } from 'victory'

import VacsRedLine from './VacsRedLine'
import VacsLabel from './VacsLabel'
import { animateBar, colors, getTheme } from '../../styles/_theme'
import { getRegionTooltip } from '../../utils/charts'

import RegionsChartDetails from '../RegionsChartDetails'

import { getDaysData, getRegionVaccines } from '../../data'

const VacsVaccinesRegionsChart = ({ children, maxDomain = 100, data }) => {
  return (
    <figure>
      <figcaption>{children}</figcaption>
      <div className="chart">
        <VictoryChart
          height={350}
          width={280}
          domainPadding={10}
          theme={getTheme()}
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
            domain={[0, maxDomain]}
            tickValues={[getDaysData('CAN')[0].y, 30, 50]}
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
          <VacsRedLine y={50} labelY={274} labels={['Canada Day\n(July 1)']} />
        </VictoryChart>
      </div>

      <RegionsChartDetails
        regionsData={data}
        sortedData={getRegionVaccines({ data, sortBy: 'ascending', withDays: false })}
      />
    </figure>
  )
}

VacsVaccinesRegionsChart.propTypes = {
  children: oneOfType([array, object]).isRequired,
  data: array,
  maxDomain: number,
}

export default VacsVaccinesRegionsChart
