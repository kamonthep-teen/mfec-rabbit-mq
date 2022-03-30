const rabbit = require('amqplib')
const { faker } = require('@faker-js/faker')

let MQ_CLOUDAMQP_URL =
    'amqp://oxixpawx:R7LLCXlKmE57-Ph4E7y_NsPYE-BjpILc@frosty-teal-greyhound.rmq2.cloudamqp.com/oxixpawx'
//api sending message
async function sending(req, res) {
    try {
        let i = 1
        do {
            await sendingAmqplib(i)
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

//api receive message
async function receive(req, res) {
    try {
        let i = 1

        do {
            await receiveAmqplib(i)
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

// send message to amqplib
async function sendingAmqplib(i) {
    try {
        const connection = await rabbit.connect(MQ_CLOUDAMQP_URL, function (err, conn) {
            if (err) {
                console.log('🚀 ~ file: index.controller.js ~ line 56 ~ sendingAmqplib ~ err', err)
            }
            conn.on('error', function (err) {
                if (err.message !== 'Connection closing') {
                    console.log('🚀 ~ file: index.controller.js ~ line 64 ~ err', err.message)
                }
            })
        })
        // const connection = await rabbit.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()
        await channel.assertQueue('user')

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

// acknowledge message from amqplib
async function receiveAmqplib(i) {
    try {
        const connection = await rabbit.connect(MQ_CLOUDAMQP_URL, function (err, conn) {
            if (err) {
                console.log('🚀 ~ file: index.controller.js ~ line 56 ~ sendingAmqplib ~ err', err)
            }
            conn.on('error', function (err) {
                if (err.message !== 'Connection closing') {
                    console.log('🚀 ~ file: index.controller.js ~ line 64 ~ err', err.message)
                }
            })
        })
        // const connection = await rabbit.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()
        await channel.assertQueue('user')

        setTimeout(() => {
            channel.consume('user', (message) => {
                // console.log(message.content.toString())
                channel.ack(message)
            })
            console.log(i + 'Waiting for message...')
        }, 1000)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    receive,
    sending,
}
