require('dotenv').config();
const express = require('express');
const connectToDb = require('./connection');
const userModel = require("./User");

const app = express();
const port = 3000;

//Configuring express for json
app.use(express.json());

/* 
	route:				/
	description:	For testing.
	parameters:		none
*/
app.get('/', (req, res)=>{
	return res.json({message: "Success"});
});

/* 
	route:				/users
	description:	To get all the users.
	parameters:		none
*/
app.get("/users", async(req, res)=>{
	const users = await userModel.find();
	return res.json({ users });
})

/* 
	route:				/user/new
	description:	To create new user.
	parameters:		none
	request body:	user object
*/
app.post("/user/new", async(req, res)=>{
	const { userObj } = req.body;  //Destructoring the request body
	await userModel.create(userObj);
	return res.json({"message":"User created"});
})

/* 
	route:				/user/update
	description:	To update an existing user.
	parameters:		none
	request body:	user object with the userId
*/
app.put("/user/update", async (req, res)=>{
	const { user } = req.body;
	const updatedData = await userModel.findByIdAndUpdate(user._id, {$set: user}, {new: true} )
	return res.json({updatedData})
})

/* 
	route:				/user/delete
	description:	To delete an existing user.
	parameters:		none
	request body:	user object with the userId
*/
app.delete('/user/delete', async (req, res)=>{
	const {user} = req.body;
	await userModel.findByIdAndDelete(user._id);
	return res.json({"message": "User is deleted"});
})

/* 
	route:				/user/delete/type
	description:	To delete all existing users of the type.
	parameters:		none
	request body:	user object with the type
*/
app.delete('/user/delete/type', async (req, res)=>{
	const {type} = req.body;
	await userModel.findOneAndDelete({type});
	return res.json({"message": "User is deleted"});
})

app.listen(port, ()=>{
	connectToDb()
	.then(()=>{
		console.log("Database connection successful."); 
		console.log(`Server is running at http://localhost:${port}`);
	}).catch(error => {
		console.log("Unable to establish connection with database: ", error)
	});
});