const router = require("express").Router()
const fetch = require("node-fetch")

const apiHost = process.env.API_HOST

function handleResponse(response) {
  return response
    .json()
    .then((json) => (response.ok ? json : Promise.reject(json.error)))
}

router.post("/", (req, res, next) => {
  const { Authorization, url, method, body } = req.body

  const uri = `${apiHost}${url}`
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  }
  if (method && method.toLowerCase() !== "get") {
    options.body = JSON.stringify(body)
  }

  console.log(`[CALL] ${uri}`)
  console.log(`[OPTIONS] ${options}`)

  return fetch(uri, options)
    .then(handleResponse)
    .then((json) => res.json(json))
    .catch(next)
})

module.exports = router
