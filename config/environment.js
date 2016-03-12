var _ = require('lodash');

var localEnvVars = {
  TITLE:      'pickyeater',
  SAFE_TITLE: 'pickyeater'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
