import React from 'react'

import { array, object, oneOfType, shape, string, number } from 'prop-types'

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLegend,
} from 'victory'

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

import { getDaysData, getFullData, getVaccinesData } from '../../data'

class VacsVaccinesDaysChart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain })
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain })
  }

  render() {
    const { children, abbr, data } = this.props
    return (
      <figure>
        <figcaption>{children}</figcaption>
        <div className="chart">
          <VictoryChart
            height={120}
            width={280}
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
              data={[{ name: `${data.demonym} vaccinated*` }, { name: 'Days in 2021' }]}
            />
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[getDaysData({ abbr })[0].y, 50, 70, 100]}
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
                data={getDaysData({ abbr })}
                labels={getDaysLabel}
                labelComponent={<VacsLabel tooltipLabel={() => getDaysTooltip()} />}
              />
              <VictoryBar
                animate={animateBar}
                name="bar-vaccines"
                data={getVaccinesData({ abbr, data })}
                labels={getVaccinesLabel(data)}
                labelComponent={<VacsLabel tooltipLabel={() => getRegionTooltip(data)} />}
              />
              <VictoryBar
                animate={animateBar}
                name="bar-full"
                data={getFullData({ abbr, data })}
                labels={getFullLabel(data)}
                labelComponent={<VacsLabel tooltipLabel={() => getFullTooltip(data)} />}
              />
            </VictoryGroup>
            <VacsRedLine />
          </VictoryChart>
        </div>
      </figure>
    )
  }
}

VacsVaccinesDaysChart.propTypes = {
  children: oneOfType([array, object]).isRequired,
  abbr: string,
  data: shape({
    abbr: string,
    date: string,
    demonym: string,
    name: string,
    population: number,
    province: string,
    total_received_vaccine: number,
    total_vaccinated: number,
    total_vaccinations: number,
  }),
}

export default VacsVaccinesDaysChart
