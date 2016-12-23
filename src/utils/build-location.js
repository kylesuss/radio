export default function buildLocation (city, country) {
  return city ? `${city}, ${country}` : country
}
