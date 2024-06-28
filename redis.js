// const { Socket } = require("dgram");
const { createClient } = require("redis");

const client = createClient({
    username : 'default',
    password : process.env.REDIS_PASSWORD,
    socket : {
        ssl : true,
        host : process.env.REDIS_URL,
        port : 11539,
    }
});

module.exports = { client };
