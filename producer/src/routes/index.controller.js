const rabbit = require('amqplib')
const { faker } = require('@faker-js/faker')
const fs = require('fs')

//api sending message
async function sending(req, res) {
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
    const channel = await connection.createConfirmChannel()

    try {
        let i = 1

        do {
            await channel.assertQueue('user', { durable: true })
            sendingAmqplib(channel, i)
            i++
            // } while (i !== 0)
        } while (i < 10)

        res.status(200).json({
            status: 200,
            message: 'ok',
        })
    } catch (error) {
        console.error('Error in send to queue message', error)
        res.status(400).json({
            status: 400,
            message: error,
        })
    }
}

// send message to amqplib
function sendingAmqplib(channel, i) {
    let data = {
        id: i,
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phonenumber: faker.phone.phoneNumber(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
    }

    setTimeout(() => {
        // channel.sendToQueue('user', Buffer.from(JSON.stringify(data)))
        channel.sendToQueue('user', Buffer.from(JSON.stringify(data)), {}, (err) => {
            if (err) {
                fs.writeFile(
                    `./message/${Date.now()}_errorSendMessage_${i}.json`,
                    JSON.stringify(err),
                    function (error) {
                        if (error) {
                            return console.log(error)
                        }
                        console.log('The test report file was saved as JSON file!')
                    }
                )
                throw err
            }
            console.log(`${Date.now()} - Job sent successfully - ${i}`)
        })
    }, i * 10)
}

module.exports = {
    sending,
}
