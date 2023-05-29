import React from 'react'
import './button.styles.scss'
import Spinner from '../spinner/spinner.component'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, isLoading, ...ortherProps}) => {


  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}` } {...ortherProps}>
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
