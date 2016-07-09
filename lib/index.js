'use strict'

const Package = require('../package.json');

module.exports = {
    name: 'mongo',
    data: { register: function(request, options, next){ next() } }
    when: {
        'plugin:mongo': function(){
        }
    }
};

module.exports.data.register.attributes = { pkg: Package }
