const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  db: {
    url: 'mongodb://localhost:27017',
    name: 'sportEvents'
  },
  jwt: {
    secret: 'some secret for sport events',
    expiresIn: '4h'
  }
};
