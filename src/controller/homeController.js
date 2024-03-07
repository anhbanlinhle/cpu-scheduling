import { json } from 'body-parser';

let home = async (req, res) => {
  return res.render('home.ejs')
}

module.exports = {
  home
}