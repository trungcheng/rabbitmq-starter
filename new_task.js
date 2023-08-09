var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    console.log("[AMQP] RabbitMQ connected");

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            // if true, both producer and consumer need to be true
            durable: true // true - keep queue won't be lost even if RabbitMQ restart
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true, // save to disk or cache when durable true
            expiration: '10000' // 10s, after that time, the message will be deleted
        });

        console.log("[x] Sent '%s'", msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});