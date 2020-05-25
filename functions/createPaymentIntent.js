// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const setupStripe = require("stripe")
const { STRIPEKEY } = process.env
const stripe = setupStripe(STRIPEKEY)

exports.handler = async (request, _, callback) => {
  const amount = request?.queryStringParameters?.amount * 100 || 1000
  const giftaid = request?.queryStringParameters?.giftaid || "no"

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "gbp",

    // Verify your integration in this guide by including this parameter
    metadata: {
      integration_check: "accept_a_payment",
      giftaid,
    },
  })

  callback(null, {
    statusCode: 200,
    body: paymentIntent.client_secret,
  })
}
