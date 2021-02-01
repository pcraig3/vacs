import { string } from 'prop-types'
import { format } from 'date-fns'

const lastUpdated = require('../data/_lastUpdated.json').last_updated

const getTimeZone = () => {
  // https://stackoverflow.com/a/30407960
  const d = new Date()
  return d.toLocaleString('en', { timeZoneName: 'short' }).split(' ').pop()
}

const LastUpdated = ({ datetime = lastUpdated }) => {
  const datetimeFormat = "EEEE, MMM d 'at' h:mm bbbb"
  const timeFormat = 'EEEE, MMMM d'

  let formatString = datetimeFormat
  if (datetime.length === 10) {
    datetime = `${datetime}T12:00:00Z`
    formatString = timeFormat
  } else {
    // eg "2021-01-31 23:35:49"
    const [_d, _t] = datetime.split(' ')
    datetime = `${_d}T${_t}-0600`
  }

  return (
    <p>
      Last updated:{' '}
      <time dateTime={datetime}>
        {format(new Date(datetime), formatString)} {formatString !== timeFormat && getTimeZone()}
      </time>
      <style jsx>{`
        z-index: 1;
      `}</style>
    </p>
  )
}

LastUpdated.propTypes = {
  datetime: string,
}

export default LastUpdated
