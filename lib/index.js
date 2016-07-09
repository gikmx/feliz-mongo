'use strict'

const MongoDB = require('mongodb');
const Package = require('../package.json');

module.exports = {
    MongoDB,
    name: 'mongo',
    data: { register: function(request, options, next){ next() } },
    when: {
        'plugin:mongo': function(){
            let options = this.options.mongo;
            if (!this.util.is(options).object()) options = {};
            if (!this.util.is(options.host).string()) options.host = '127.0.0.1';
            if (!this.util.is(options.port).number()) options.port = 27017;
            if (!this.util.is(options.name).string()) throw this.error.type({
                name: 'mongo.name',
                type: 'string',
                data: !options.name? options.name : options.name.constructor.name
            });
            const url = `mongodb://${options.host}:${options.port}/${options.name}`;
            MongoDB.MongoClient.connect(url, (err, db) => {
                if (err) throw this.error(err.message);
                this.set('mongo', db);
                this.events.emit('plugin:mongo:ready', this);
            });
        }
    }
};

module.exports.data.register.attributes = { pkg: Package }
