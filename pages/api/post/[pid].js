export default (req, res) => {
  // req...API
  // res...APIを叩いて返ってきた値

  const {
    query: {pid}
  } = req

  res.end( `Post: ${pid}`)
}