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
import { animateBar, colors, getTheme } from '../../styles/_theme'
import {
  getDaysLabel,
  getFullLabel,
  getVaccinesLabel,
  getDaysTooltip,
  getFullTooltip,
  getRegionTooltip,
} from '../../utils/charts'

import DaysChartDetails from '../DaysChartDetails'

import { getDaysData, getFullData, getVaccinesData } from '../../data'

class VacsVaccinesDaysChart extends React.Component {
  constructor() {
    super()

    this.getXDomain = this.getXDomain.bind(this)
    this.getXTickValues = this.getXTickValues.bind(this)
    this.getWidth = this.getWidth.bind(this)
    this.getThemeProps = this.getThemeProps.bind(this)
    this.getLabelProps = this.getLabelProps.bind(this)

    this.state = {
      renderFromState: true,
      themeProps: this.getThemeProps({ isMd: true }),
      labelProps: this.getLabelProps({ isMd: true }),
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && this.state.renderFromState) {
      let width = window.innerWidth
      const isXs = width > 1 && width < 350
      const isSm = width >= 350 && width < 550
      const isMd = width >= 550 && width < 800

      this.setState({
        renderFromState: false,
        themeProps: this.getThemeProps({ isXs, isSm, isMd }),
        labelProps: this.getLabelProps({ isXs, isSm, isMd, maxDomain: 80 }),
      })
    }
  }

  getXDomain({ maxDomain }) {
    return [0, maxDomain]
  }

  getXTickValues({ abbr, maxDomain }) {
    if (maxDomain !== 100) {
      return [getDaysData({ abbr })[0].y, 50]
    }
    return [getDaysData({ abbr })[0].y, 50, 70, maxDomain]
  }

  getWidth({ isXs, isSm, isMd }) {
    if (isXs) return 180
    if (isSm) return 220
    if (isMd) return 260
    return 280
  }

  getThemeProps({ isXs, isSm, isMd }) {
    const height = 135
    if (isXs)
      return {
        width: 180,
        height: 175,
        fontSize: 9.5,
        padding: {
          top: 55,
          left: 7,
        },
        legend: { orientation: 'vertical', x: 5 },
        bar: { domainPadding: { x: [10, -10], y: 5 } },
      }
    if (isSm)
      return {
        width: 220,
        height: 175,
        fontSize: 9,
        padding: {
          top: 55,
          left: 5,
        },
        legend: { orientation: 'vertical', x: 5 },
      }
    if (isMd) return { width: 260, height, fontSize: 9 }
    return { width: 280, height, fontSize: 8, padding: {
      top: 35,
    }}
  }

  getLabelProps({ isXs, isSm, maxDomain }) {
    if (isXs)
      return {
        labelY: 140,
        textAnchor: 'end',
        fontSize: 9,
        labels: maxDomain === 100 ? ['Labour Day (Sept 6)'] : ['Canada Day (July 1)'],
      }

    if (isSm)
      return {
        labelY: 140,
        textAnchor: 'end',
        fontSize: 9,
        labels: maxDomain === 100 ? ['Labour Day (Sept 6)'] : ['Canada Day (July 1)'],
      }

    return {
      labelY: 55,
      labels: maxDomain === 100 ? ['Labour Day (Sept 6)'] : ['Canada Day (July 1)'],
    }
  }

  render() {
    const { children, abbr, data, maxDomain = 100 } = this.props

    const themeProps = this.state.renderFromState
      ? this.state.themeProps
      : this.getThemeProps(this.props)

    const labelProps = this.state.renderFromState
      ? this.state.labelProps
      : this.getLabelProps(this.props)

    return (
      <figure>
        <figcaption>{children}</figcaption>
        <div className="chart">
          <VictoryChart
            theme={getTheme(themeProps)}
            containerComponent={
              <VictoryContainer
                style={{
                  userSelect: 'auto',
                  touchAction: 'auto',
                }}
                aria-describedby="days-chart-text-description"
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
              domain={this.getXDomain({ maxDomain })}
              tickValues={this.getXTickValues({ abbr, maxDomain })}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />
            <VictoryGroup
              horizontal
              offset={18}
              style={{
                data: { width: 10, padding: { top: 50 } },
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
            {maxDomain === 100 ? (
              <VacsRedLine {...labelProps} />
            ) : (
              <VacsRedLine y={50} {...labelProps} />
            )}
          </VictoryChart>
        </div>
        <DaysChartDetails regionData={data} id="days-chart-text-description" />
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
  maxDomain: number,
}

// sizes are different than breakpoints because graphs are awful
const mapSizesToProps = ({ width }) => ({
  isXs: width > 1 && width < 350,
  isSm: width >= 350 && width < 550,
  isMd: width >= 550 && width < 800,
  isLg: width >= 800,
})

export default withSizes(mapSizesToProps)(VacsVaccinesDaysChart)
