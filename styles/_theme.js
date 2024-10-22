// Colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  darkGrey: '#2e2e2e',
  veryDarkGrey: '#212121',
  lightGrey: '#e2e2e2',
  veryLightGrey: '#f0f0f0',
  linkText: 'palevioletred',

  QcBlueLight: '#b9cde0',
  QcBlueDark: '#223654',
  QcOrangeAccent: '#E1775A',
  CanadaRed: 'crimson',
}

// Strokes
const strokeDasharray = '10, 5'
const strokeLinecap = 'round'
const strokeLinejoin = 'round'

// Animate
const animateBar = { duration: 1500, onLoad: { duration: 500 } }

const getTheme = ({
  width = 350,
  height = 350,
  padding: { top = 35, bottom = 25, left = 0, right = 10 } = {},
  fontSize = 8,
  legend: { orientation = 'horizontal', x = 0 } = {},
} = {}) => {
  // Layout
  const padding = 8
  const baseProps = {
    width,
    height,
    padding: {
      top,
      bottom,
      left,
      right,
    },
  }

  // Typography
  const sansSerif = "'Space Grotesk', sans-serif"
  const letterSpacing = 'normal'

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

  return {
    axis: {
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
          size: 3,
          stroke: colors.darkGrey,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: colors.black,
          fontSize: 7.5,
          padding: 3,
        }),
      },
      ...baseProps,
    },
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
      x,
      y: 7,
      orientation,
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
  }
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

export { colors, space, getTheme, animateBar }
