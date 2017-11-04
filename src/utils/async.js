import request from 'superagent'

export const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.onerror = (error) => reject(error)
    script.onload = () => resolve()
    script.src = url
    document.body.appendChild(script)
  })
}

export const get = ({ url }) => {
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((error, response) => {
        if (error) { return reject(error) }
        resolve(response)
      })
  })
}
