export default ({ text }) => ({
  timezone: null,
  shows: {
    current: {
      name: text.trim()
    }
  }
})
