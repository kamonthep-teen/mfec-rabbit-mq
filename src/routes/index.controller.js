const rabbit = require('amqplib')
const { faker } = require('@faker-js/faker')

//api sending message
async function sending(req, res) {
    try {
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
        let i = 1

        do {
            await channel.assertQueue('user')
            await sendingAmqplib(channel, i)
            i++
        } while (i !== 0)
        // } while (i < 1)

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

// send message to amqplib
async function sendingAmqplib(channel, i) {
    try {
        let data = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            phonenumber: faker.phone.phoneNumber(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
        }
        // Promise((resolve) => {
        setTimeout(() => {
            channel.sendToQueue('user', Buffer.from(JSON.stringify(data)))
            // resolve('Job sent successfully')
            console.log(`Job sent successfully ${i}`)
        }, i * 10)
        // })
    } catch (error) {
        console.error(error)
    }
}

//api receive message
async function receive(req, res) {
    try {
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
        let i = 1

        do {
            await channel.assertQueue('user')
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
    try {
        setTimeout(() => {
            channel.consume('user', (message) => {
                // console.log(message.content.toString())
                channel.ack(message)
            })
            console.log(i + 'Waiting for message...')
        }, i * 1000)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    receive,
    sending,
}
