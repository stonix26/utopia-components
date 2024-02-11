export const getInitials = (str: string): string => {
  // Split the string into words, map over each word and return its initial capitalized
  return str
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
}
