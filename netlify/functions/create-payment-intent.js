require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try{
        //try to make payment to stripe 
        //currency and method
        const { amount } = JSON.parse(event.body);

        //we need to create the amount an details of the payment to send 
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency : "usd",
            payment_method_types : ["card"]

        });

        //return a status code to handle the errors 
        return {
            statusCode : 200,
            body: JSON.stringify({ paymentIntent })
        }

    }catch( error ){
        console.log({ error });

        //create netlify cli to implement the payment 
        return {
            statusCode: 400,
            body: JSON.stringify({ error })
        }

    }
}