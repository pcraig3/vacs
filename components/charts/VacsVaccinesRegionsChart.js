import fetch from 'unfetch'
import useSWR from 'swr'
import { array, object, oneOfType } from 'prop-types'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLegend } from 'victory'

import VacsRedLine from './VacsRedLine'
import VacsLabel from './VacsLabel'
import { animateBar, colors, theme } from '../../styles/_theme'
import { getRegionTooltip } from '../../utils/charts'

import { getDaysData, getRegionVaccines } from '../../data'

const fetcher = (url) => fetch(url).then((r) => r.json())

const VacsVaccinesRegionsChart = ({ children }) => {
  // when data comes back it looks like { data: [{ }], last_updated: "datetime" }
  let { data: { data: [..._data] = [] } = {} } = useSWR(
    'https://api.covid19tracker.ca/summary/split',
    fetcher,
  )

  return (
    <figure>
      <figcaption>{children}</figcaption>
      <div className="chart">
        <VictoryChart height={400} width={360} domainPadding={8} theme={theme}>
          <VictoryLegend
            colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
            data={[{ name: 'Canadians vaccinated*' }, { name: 'Days in 2021' }]}
          />
          <VictoryAxis
            fixLabelOverlap={true}
            style={{
              ticks: { size: 3 },
              tickLabels: { fontSize: 7.5, padding: 2 },
            }}
          />
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
            data={getRegionVaccines({ data: _data })}
            labels={({ datum }) => `${datum.y}%`}
            style={{
              data: {
                fill: ({ datum }) => datum.fill || colors.QcOrangeAccent,
              },
            }}
            labelComponent={
              <VacsLabel
                tooltipLabel={(label) => getRegionTooltip({ abbr: label.datum.x, data: _data })}
              />
            }
          />
          <VacsRedLine labelY={342} />
        </VictoryChart>
      </div>
    </figure>
  )
}

VacsVaccinesRegionsChart.propTypes = {
  children: oneOfType([array, object]).isRequired,
}

export default VacsVaccinesRegionsChart