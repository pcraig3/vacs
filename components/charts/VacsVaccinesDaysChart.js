import React from 'react'
import withSizes from 'react-sizes'
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
    this.getWidth = this.getWidth.bind(this)
  }

  getWidth({ isXs, isSm, isMd }) {
    if (isXs) return 180
    if (isSm) return 210
    if (isMd) return 260
    return 280
  }

  render() {
    const { children, abbr, data } = this.props
    return (
      <figure>
        <figcaption>{children}</figcaption>
        <div className="chart">
          <VictoryChart
            height={120}
            width={this.getWidth(this.props)}
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

const mapSizesToProps = ({ width }) => ({
  isXs: width > 1 && width < 380,
  isSm: width >= 380 && width < 600,
  isMd: width >= 600 && width < 900,
  isLg: width >= 900,
})

export default withSizes(mapSizesToProps)(VacsVaccinesDaysChart)
