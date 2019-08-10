const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.port || 3002 || 3001 || 3000;

// Server startup
app.listen(PORT, function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Pharmacy company server is running on port ' + PORT);
});



const pharmacy = [{name:"Panadol", price:45},
    {name:"Piriton",price:30},
    {name:"Amoxilin",price:40},
    {name:"Vitamin",price:40},
    {name:"Peroxide",price:340}];

const customers = [{
                        id:1,
                        name:"Malith Alawaththa",
                        type:"admin",
                        mobileNo:"0718220691",
                        username:"admin",
                        password:"123",
                        email:"malitha.emedia@gmail.com",
                        loyalityPoints:0},

                   {
                       id:2,
                       name:"Sheena Daniels",
                       type:"user",mobileNo:"0777234543",
                       username:"user",
                       password:"123",
                       email:"sheena@gmail.com",
                       loyalityPoints:5
                   }];

const payments = [];

const dialog = [{phoneNo:"0771234567",pin:1234}];
const sampath = [{creditCardNo:1234,cvc:123,holdersName:'ds'}];


// To resolve cross origin issues
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// REST APIs

// Customers service
app.get('/customers', function(req, res) {
  res.status(200).send(customers);

});

// Customer get by id
app.get('/customers/:id', function (req,res) {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    if(!customer) res.status(404).send('cannot find the customer');

    else res.status(200).send(customer);
});


// POST a customer
app.post('/customers', function (req, res) {

    if(!req.body) {
        res.status(404).send('cannot find the customer');
        return;
    }
    const customer = {
        id:customers.length +1,
        name: req.body.name,
        type: req.body.type,
        mobileNo: req.body.mobileNo,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        loyalityPoints: "0"
    };

    customers.push(customer);
    res.status(200).send(customer);
    fs.writeFile('./Files/Customers.txt', JSON(customer), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});


// Check Login

app.post('/customers/login', function (req, res) {
    if(!req.body) {
        res.status(404).send('cannot find the customer');
        return;
    }

    const customer = customers.find(c => (c.username === req.body.username) && (c.password === req.body.password));

    if(!customer) res.status(404).send('cannot find the customer');

    else res.status(200).send(customer);


});







// Pharmacy Service

app.get('/pharmacy', function(req, res) {
    res.status(200).send(pharmacy);
});

app.get('/pharmacy/:id', function (req,res) {
    const pharmacy = pharmacy.find(c => c.id === parseInt(req.params.id));

    if(!food) res.status(404).send('cannot find medic');

    else res.status(200).send(medicine);
});

app.post('/pharmacy', function (req, res) {
    if(!req.body) {
        res.status(400).send('Bad request');
        return;
    }
    const foodi = {
        name: req.body.name,
        price: req.body.price
    };

    pharmacy.push(medii);
    res.status(200).send(medii);
});





// Dialog Payment Gateway

app.post('/dialog', function (req, res) {
    if(!req.body) {
        console.log('invalid');
        return;
    }

    const holder = dialog.find(c => (c.phoneNo === req.body.phoneNo) && (c.pin === parseInt(req.body.pin)));

    if(!holder) res.status(404).send('Not Found');

    else {
        const body = {
            amount:req.body.amount,
            userId:req.body.userId,
            date:new Date()
        };
        payments.push(body);
        res.status(200).send('payments are success');

    }
    console.log(holder);
});



//Sampath Payment Gateway
app.post('/sampath', function (req, res) {
    if(!req.body) {
        console.log('invalid');
        return;
    }

    const holder = sampath.find(c => (c.creditCardNo === parseInt(req.body.creditCardNo)) &&
                                    (c.cvc === parseInt(req.body.cvc))  &&
                                    (c.holdersName === (req.body.holdersName);

    if(!holder) res.status(404).send('Not Found');

    else {
        const body = {
            amount:req.body.amount,
            userId:req.body.userId,
            date:new Date()
        };
        payments.push(body);
        res.status(200).send('payments are success');

    }
    console.log(holder);
});






