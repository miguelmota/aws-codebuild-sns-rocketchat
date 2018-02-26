const { handler } = require('./index.js')

handler({Records:[{Sns:{Message:'hello world!'}}]}, {done: function(){}})
