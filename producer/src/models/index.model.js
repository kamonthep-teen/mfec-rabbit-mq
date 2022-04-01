const { faker } = require('@faker-js/faker')

let data = {
    api_key: faker.datatype.uuid(),
    alert_type: '04D',
    cis_id: '0000002388',
    txn_date: '2020-03-26',
    txn_time: '14:08',
    txn_type: '0890',
    product_type: '001',
    product_number: faker.phone.phoneNumber(),
    txn_amt: '1,210',
    acct_balance: '20,000',
    line_payload: `{
      "to": "Uca425f47d414bb6b3d7845ed8fe24a8d",
      "messages": [
        {
          "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
                "type": "carousel",
                "contents": [
                  {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [
                                    {
                                        "type": "image",
                                        "url": "https://img.icons8.com/cotton/2x/receive-cash--v1.png",
                                        "flex": 0,
                                        "size": "xs"
                                    },
                                    {
                                        "type": "text",
                                        "weight": "bold",
                                        "size": "xl",
                                        "text": "ฝากเงินสด",
                                        "position": "relative",
                                        "align": "center",
                                        "gravity": "center"
                                    }
                                ]
                            },
                            {
                                "type": "separator",
                                "margin": "xxl"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "margin": "xxl",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "จากบัญชี",
                                                "size": "sm",
                                                "color": "#555555",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": "xx-xxx-xx999-9",
                                                "size": "sm",
                                                "color": "#111111",
                                                "align": "end"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "วันที่",
                                                "size": "sm",
                                                "color": "#555555",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": "26 มี.ค 63",
                                                "size": "sm",
                                                "color": "#111111",
                                                "align": "end"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "เวลา",
                                                "size": "sm",
                                                "color": "#555555",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": "14:08 น.",
                                                "size": "sm",
                                                "color": "#111111",
                                                "align": "end"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "จำนวนเงิน",
                                                "size": "sm",
                                                "color": "#555555",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": "1,210 บาท",
                                                "size": "sm",
                                                "color": "#8acd9d",
                                                "align": "end"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "separator",
                                        "margin": "xxl"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "horizontal",
                                        "margin": "xxl",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ยอดเงินคงเหลือ",
                                                "size": "sm",
                                                "color": "#555555",
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": "20,000 บาท",
                                                "size": "sm",
                                                "color": "#111111",
                                                "align": "end",
                                                "weight": "bold"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "styles": {
                        "footer": {
                            "separator": true
                        }
                    }
                  }
                ]
              }
            }
        ]
      }`,
}

module.exports = {
    data,
}
