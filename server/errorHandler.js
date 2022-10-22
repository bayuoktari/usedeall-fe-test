module.exports = (err, req, res, next) => {
  console.log("Caught by error handler")
  console.log(err)
  const code = err.code || 500
  res.status(code).json(err)
}
