var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchangeName = 'video';
        var msg = process.argv.slice(2).join(' ') || "Hello Exchange!";

        channel.assertExchange(exchangeName, 'fanout', {
            durable: false
        });

        channel.publish(exchangeName, '', Buffer.from(msg));

        console.log(`[x] Send ok: ${msg}`);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 2000);
});