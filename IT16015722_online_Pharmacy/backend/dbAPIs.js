const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.port || 3002 || 3001 || 3000;


const mongoose1 = require('./DBSchema/CustomerSchema');
const mongoose2 = require('./DBSchema/FoodSchema');
const mongoose3 = require('./DBSchema/PaymentGateways/Dialog');
const mongoose4 = require('./DBSchema/PaymentGateways/Sampath');
const mongoose5 = require('./DBSchema/PaymentSchema');


const CustomerSchema = mongoose1.model('Customer');
const FoodSchema = mongoose2.model('Food');
const dialogSchema = mongoose3.model('dialog');
const sampathSchema = mongoose4.model('sampath');
const PaymentSchema = mongoose5.model('Payment');

const Mongo_DB_Base_URL = "mongodb://127.0.0.1:27017";

// Server
app.listen(PORT, function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Pharmacy server is running on port ' + PORT);
});

// To resolve cross origin issues
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// Db connection
mongoose1.connect(Mongo_DB_Base_URL+"/FoodCompany", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('FoodCompany Db is connected');
});

mongoose2.connect(Mongo_DB_Base_URL+"/Food", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Food Db is connected');
});

mongoose3.connect(Mongo_DB_Base_URL+"/dialog", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('connected to Dialog Payment gateway ...');
});

mongoose4.connect(Mongo_DB_Base_URL+"/sampath", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to Sampath Bank Payment gateway...');
});


mongoose5.connect(Mongo_DB_Base_URL+"/Payments", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Payments DB is connected');
});


// REST API Customers

app.get('/customers',function(req, res) {
    CustomerSchema.find().exec().then(function (customers) {
        res.status(200).send(customers);
    }).catch(function (err) {
        res.status(400).send('Bad Reques');
    });
});

app.get('/customers/:id',function(req, res) {
    CustomerSchema.find({_id:req.params.id}).exec().then(function (customers) {
        res.status(200).send(customers);
    }).catch(function (err) {
        res.status(400).send('Bad Reques');
    });
});

app.post('/customers', function (req, res) {

    const data = new CustomerSchema(req.body);
    console.log(req.body);
    data.save().then(function (data) {
        res.status(200).send(data);
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});

app.post('/customers/login', function (req, res) {
    if(!req.body) {
        res.status(404).send('cannot find the customer');
        return;
    }

    CustomerSchema.find({username:req.body.username,password:req.body.password}).exec().then(function (customers) {
        res.status(200).send(customers[0]);
    }).catch(function (err) {
        res.status(404).send('cannot find the customer');
    });

});

app.put('/customers/:id', function (req, res) {
    CustomerSchema.update({_id:req.params.id}, req.body).then(function (customer) {
        res.status(200).send({customer: customer, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});

app.delete('/customers/:id', function (req, res) {
    CustomerSchema.remove({_id: req.params.id}).then(function () {
        res.status(200).send({message:'deleted'});
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});


// REST API food

app.get('/food',function(req, res) {
    FoodSchema.find().exec().then(function (pharmacy) {
        res.status(200).send(food);
    }).catch(function (err) {
        res.status(400).send('Bad Reques');
    });
});

app.get('/food/:name',function(req, res) {
    FoodSchema.find({name:req.body.name}).exec().then(function (food) {
        res.status(200).send(pharmacy);
    }).catch(function (err) {
        res.status(400).send('Bad Reques');
    });
});

app.post('/food',function(req, res) {
    const food = new FoodSchema(req.body);
    food.save().then(function (food) {
        res.status(200).send(food);
    }).catch(function (err) {
        res.status(400).send('Bad Reques');
    });
});

app.put('/food/:id', function (req, res) {
    CustomerSchema.update({_id:req.params.id}, req.body).then(function (customer) {
        res.status(200).send({customer: customer, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});


app.put('/food/:id', function (req, res) {
    FoodSchema.update({_id:req.params.id}, req.body).then(function (food) {
        res.status(200).send({customer: food, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});

app.delete('/food/:id', function (req, res) {
    FoodSchema.remove({_id: req.params.id}).then(function () {
        res.status(200).send({message:'deleted'});
    }).catch(function () {
        res.status(400).send({message:'Bad request'});
    });
});

// Dialog Payment Gateway APIs

app.post('/dialog', function (req, res) {
    if(!req.body) {
        console.log('invalid');
        return;
    }
    const dialog = new dialogSchema({
        amount:req.body.amount,
        phoneNo:req.body.phoneNo,
        date:new Date()
    });

    const payment = new PaymentSchema({
        amount:req.body.amount,
        type:req.body.type,
        date:new Date(),
        userid:req.body.userId
    });

    if(req.body.pin === '1234') {
        dialog.save().then(function () {
            payment.save().then(function () {
                res.status(200).send({message:'payment success via dialog'});
            }).catch(function () {
                res.status(400).send({message:'Bad request'});
            });
            // res.status(200).send();
        }).catch(function () {
            res.status(400).send({message:'Bad request'});
        });
    }

    else res.status(400).send({message:'Bad request'});


});

// Sampath Payment Gateway APIs

app.post('/sampath', function (req, res) {
    if(!req.body) {
        console.log('invalid');
        return;
    }
    const sampath = new sampathSchema({
        amount:req.body.amount,
        holdersName:req.body.holdersName,
        creditCardNo:req.body.creditCardNo,
        date:new Date(),
    });

    const payment = new PaymentSchema({
        amount:req.body.amount,
        type:req.body.type,
        date:new Date(),
        userid:req.body.userId
    });

    if(req.body.cvc === '123') {
        sampath.save().then(function () {
            payment.save().then(function () {
                res.status(200).send({data:payment,message:'payment success via sampath'});
            }).catch(function () {
                res.status(400).send({message:'Bad request'});
            });
            //res.status(200).send();
        }).catch(function () {
            res.status(400).send({message:'Bad request'});
        });
    }

    else res.status(400).send({message:'Bad request'});


});

// Payments APIs

app.get('/payments',function (req,res) {
    PaymentSchema.find().exec().then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        console.log(err);
    })
});
