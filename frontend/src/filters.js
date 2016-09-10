import moment from 'moment'

export const dateFormat = (value, format) => {
  return moment(value).format(format)
}
