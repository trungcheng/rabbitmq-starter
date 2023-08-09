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

        channel.assertExchange(exchangeName, 'fanout', {
            durable: false
        });
        
        // Create queue
        const { queue } = channel.assertQueue('', {
            exclusive: true // auto remove queue when exit, don't subscribe anymore
        });

        console.log(`Queue name: ${queue}`);

        // Binding exchange and queue
        channel.bindQueue(queue, exchangeName, '');

        channel.consume(queue, msg => {
            console.log(`Msg:`, msg.content.toString());
        }, {
            noAck: true
        });
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 2000);
});