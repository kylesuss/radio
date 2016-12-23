import React, { Component, PropTypes } from 'react'
import RadioIconUnchecked from 'react-icons/lib/md/radio-button-unchecked'
import RadioIconChecked from 'react-icons/lib/md/radio-button-checked'
import 'styles/radio'

export default class Radio extends Component {
  static propTypes = {
    label: PropTypes.string,
    isChecked: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isChecked: false
  }

  render () {
    return (
      <div className="radio">
        <label>
          <div className="flex flex-align-center">
            {
              this.props.isChecked
                ? <RadioIconChecked />
                : <RadioIconUnchecked />
            }
            <span className="radio__label-text m-l-0__3">
              {this.props.label}
            </span>
          </div>
        </label>
      </div>
    )
  }
}
