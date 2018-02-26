const { handler } = require('./index.js')

handler({Records:[{Sns:{Message:'test1'}}]}, {done: function(){}})
