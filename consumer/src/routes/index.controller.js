const rabbit = require('amqplib')

//api receive message
async function receive(req, res) {
    // const connection = await rabbit.connect('amqp://localhost:5672')
    const connection = await rabbit.connect(
        `amqp://${process.env.MQ_CLOUDAMQP_USERNAME}:${process.env.MQ_CLOUDAMQP_PASSWORD}@${process.env.MQ_CLOUDAMQP_URL}/${process.env.MQ_CLOUDAMQP_USERNAME}`,
        function (err, conn) {
            if (err) {
                console.log('🚀 ~ file: index.controller.js ~ line 56 ~ sendingAmqplib ~ err', err)
            }
            conn.on('error', function (err) {
                if (err.message !== 'Connection closing') {
                    console.log('🚀 ~ file: index.controller.js ~ line 64 ~ err', err.message)
                }
            })
        }
    )
    const channel = await connection.createChannel()

    try {
        let i = 1
        do {
            await channel.assertQueue('user', { durable: true })
            await receiveAmqplib(channel, i)
            i++
        } while (i !== 0)

        res.status(200).json({
            status: 200,
            message: 'ok',
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            status: 400,
            message: error,
        })
    }
}

// acknowledge message from amqplib
async function receiveAmqplib(channel, i) {
    setTimeout(() => {
        channel.consume('user', (message) => {
            console.log(`Call user API here - ${message.content}`)
            channel.ack(message)
        })
        console.log('Waiting for message...')
    }, i * 1000)
}

module.exports = {
    receive,
}
