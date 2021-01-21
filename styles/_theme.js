// Typography
const sansSerif = "'Space Grotesk', sans-serif"
const letterSpacing = 'normal'
const fontSize = 8

// Layout
const padding = 8
const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
}

// Colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  darkGrey: '#2e2e2e',
  veryDarkGrey: '#212121',
  lightGrey: '#e2e2e2',
  veryLightGrey: '#f0f0f0',

  QcBlueLight: '#b9cde0',
  QcBlueDark: '#223654',
  QcOrangeAccent: '#E1775A',
  CanadaRed: 'crimson',
}

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: colors.black,
  stroke: 'transparent',
  strokeWidth: 0,
}

const centeredLabelStyles = Object.assign({ textAnchor: 'middle' }, baseLabelStyles)

// Strokes
const strokeDasharray = '10, 5'
const strokeLinecap = 'round'
const strokeLinejoin = 'round'

const theme = {
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: colors.darkGrey,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: 'transparent',
        }),
        grid: {
          fill: 'none',
          stroke: colors.lightGrey,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: 'painted',
        },
        ticks: {
          fill: 'transparent',
          size: 5,
          stroke: colors.darkGrey,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: colors.black,
        }),
      },
    },
    baseProps,
  ),
  bar: {
    style: {
      data: {
        padding,
        width: 10,
        stroke: colors.QcBlueDark,
        strokeWidth: 1,
      },
      labels: baseLabelStyles,
    },
  },
  baseProps,
  chart: baseProps,
  legend: {
    x: 50,
    y: 15,
    orientation: 'horizontal',
    gutter: 20,
    style: {
      border: { stroke: 'black', strokeWidth: 2 },
      data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
      labels: baseLabelStyles,
      title: Object.assign({}, baseLabelStyles, { padding: 2 }),
    },
  },
  line: Object.assign(
    {
      style: {
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  tooltip: {
    style: Object.assign({}, baseLabelStyles, {
      padding: 0,
      pointerEvents: 'none',
    }),
    flyoutStyle: {
      stroke: colors.veryDarkGrey,
      strokeWidth: 1,
      fill: colors.veryLightGrey,
      pointerEvents: 'none',
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
}

// Spacing
const space = {
  xxs: '5px',
  xs: '10px',
  sm: '15px',
  md: '20px',
  lg: '30px',
  xl: '40px',
  xxl: '60px',
}

export { baseLabelStyles, colors, space, theme }
