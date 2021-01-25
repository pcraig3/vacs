import { format } from 'date-fns'

const lastUpdatedUTC = '2021-01-25T12:48:00Z'

const getTimeZone = () => {
  // https://stackoverflow.com/a/30407960
  const d = new Date()
  return d.toLocaleString('en', { timeZoneName: 'short' }).split(' ').pop()
}

const LastUpdated = () => (
  <p>
    Last updated:{' '}
    <time dateTime={lastUpdatedUTC}>
      {format(new Date(lastUpdatedUTC), "EEEE, MMM d 'at' h:m bbbb")} {getTimeZone()}
    </time>
    <style jsx>{`
      margin-top: -40px;
      margin-bottom: 40px;
      z-index: 1;
    `}</style>
  </p>
)

export default LastUpdated
