import { array, object, oneOfType } from 'prop-types'

import { colors } from '../styles/_theme'

function Button({ children, ...otherProps }) {
  return (
    <button {...otherProps}>
      {children}
      <style jsx>{`
        background: ${colors.veryLightGrey};

        cursor: pointer;
        width: auto;

        color: ${colors.linkText};
        border: 2px solid ${colors.linkText};

        :focus,
        :hover {
          outline: 0;
          background: ${colors.linkText};
          color: white;
          border: 2px solid ${colors.black};
          -webkit-box-shadow: 3px 4px black;
          box-shadow: 3px 4px black;
        }
      `}</style>
    </button>
  )
}

Button.propTypes = {
  children: oneOfType([array, object]).isRequired,
}

export default Button
