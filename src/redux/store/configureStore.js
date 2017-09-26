if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStoreProd.js');
} else {
  module.exports = require('./configureStoreDev.js');
}
