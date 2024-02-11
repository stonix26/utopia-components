import { DateTime } from 'luxon'

export function formatDateToRelative(dateString: string): string {
  const inputDate = DateTime.fromISO(dateString)
  const currentDate = DateTime.now()

  const diff = currentDate.diff(inputDate, ['years', 'months', 'days'])
  const { years, months, days } = diff.toObject()

  if (years !== 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`
  } else if (months !== 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else if (days === 1) {
    return 'yesterday'
  } else if (days !== 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`
  } else {
    return 'today'
  }
}

export function formatDate(dateString: string): string {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_MED)
}
