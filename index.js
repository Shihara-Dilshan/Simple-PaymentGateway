const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PUB_KEY = "pk_test_51Ht2WzIBGVShdhbO5nBb5H4XW1ARzVDUnYt40SfdlRviA0c9gmyJkI8CXDMZstCcBda3WMG7HrBPqfLNjepMwhAa00v5DTsXDl";
const SEC_KEY = "sk_test_51Ht2WzIBGVShdhbOxQq7yYsJaMlKESKBpG9ZUePWtyw6JhN8tTDMEGK3gYWq9aZbc3Oqn1VTpUORoHYGNHhvWHPa005jp5Ls68";

const stripe = require('stripe')(SEC_KEY);

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.render("inex", {
         key: PUB_KEY
    });
});

app.post("/payment", (req,res) => {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Shihara Dilshan',
        address: {
            line1: '55/f alapalawa handessa',
            postal_code: '22400',
            city: 'Kandy',
            state: 'Peradeniya',
            country: 'Sri Lanka'
        }
    })
    .then( customer => {
        return stripe.charges.create({
            amount: 7000,
            description: 'Demo payment',
            currency: 'USD',
            customer: customer.id
        })
    })
    .then( charge => {
        console.log(charge);
        res.send("Success");
    })
    .catch(err => {
        res.send(err);
    })
});

app.listen(PORT, () => {
    console.log("Project is up and running");
});
