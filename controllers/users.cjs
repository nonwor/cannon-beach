const User = require('../models/User.cjs')

const getUsers = async (req, res) => {
    // make a request to databse, get a response (an array of objects)
    console.log("hello, get user")
    let response = await User.find();
    res.json(response)
}

const getUsersId = async(req, res)=>{
    console.log("getting user id", req.params.id)

    let firebase = await User.find({'id':req.params.id});
    let mgdbID = firebase[0]._id;

    let objectFromDatabase = await User.findById(mgdbID);
    console.log(objectFromDatabase)
    res.status(200).json(objectFromDatabase)

}

const updateUsage = async (req, res) => {
    // get the document from mongo
    // make changes HERE in the function
    // use the .save() method
    console.log(req.params.id)
    console.log(req.params.usage)

    let fireBaseId = await User.find({'id':req.params.id});
    let mgdbID = fireBaseId[0]._id;

    let objectFromDatabase = await User.findById(mgdbID);

    console.log(objectFromDatabase)
    objectFromDatabase.usage = Number(objectFromDatabase.usage) + Number(req.params.usage)
    objectFromDatabase.save()

    res.send({
        message: "updated document",
        document: objectFromDatabase
    })
};

const updateCredit = async (req, res) => {
    // get the document from mongo
    // make changes HERE in the function
    // use the .save() method
    console.log(req.params.id)
    console.log(req.params.credit)

    let fireBaseId = await User.find({'id':req.params.id});
    let mgdbID = fireBaseId[0]._id;

    let objectFromDatabase = await User.findById(mgdbID);

    console.log(objectFromDatabase)
    objectFromDatabase.credit = Number(objectFromDatabase.credit) + Number(req.params.credit)
    objectFromDatabase.save()
    
    res.send({
        message: "updated document",
        document: objectFromDatabase
    })
}

const createUsers = async (req, res)=>{
    console.log("hello")
    console.log(req)
    let response = await User.create(req.body);
    if (response) {
        res.json(response)
    } else {
        res.status(400).json("creation falied!")
    }
}

module.exports = {
    getUsers,
    createUsers,
    getUsersId,
    updateUsage,
    updateCredit,
}