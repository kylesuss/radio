import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radio from 'components/radio'
import isEqual from 'lodash/isEqual'
import {
  NAME_SORT_KEY_ARRAY,
  COUNTRY_SORT_KEY_ARRAY
} from 'constants/stations'
import 'styles/station-list-header'

export default class StationListHeader extends Component {
  static propTypes = {
    sortKeyArray: PropTypes.array.isRequired,
    sortStations: PropTypes.func.isRequired
  }

  isChecked (comparison) {
    return isEqual(this.props.sortKeyArray, comparison)
  }

  handleSort = (sortKey) => this.props.sortStations(sortKey)

  render () {
    return (
      <div className="page--list__header flex">
        <div className="flex-grow-1 font-primary text-uppercase color-white">
          Stations
        </div>
        <div className="flex-grow-1 flex flex-justify-end color-blue-grey
                        text-uppercase font-size-13">
          <span className="m-r-1">
            Sort by:
          </span>
          <span>
            <button className="btn-reset page--list__header__button"
                    onClick={() => this.handleSort(NAME_SORT_KEY_ARRAY)}>
              <span className="page--list__header__sort-link color-blue-grey
                               text-uppercase font-size-13">
                <Radio isChecked={this.isChecked(NAME_SORT_KEY_ARRAY)}
                       label="name" />
              </span>
            </button>
          </span>
          <span className="m-l-0__8">
            <button className="btn-reset page--list__header__button"
                    onClick={() => this.handleSort(COUNTRY_SORT_KEY_ARRAY)}>
              <span className="page--list__header__sort-link color-blue-grey
                               text-uppercase font-size-13">
                <Radio isChecked={this.isChecked(COUNTRY_SORT_KEY_ARRAY)}
                       label="country" />
              </span>
            </button>
          </span>
        </div>
      </div>
    )
  }
}
