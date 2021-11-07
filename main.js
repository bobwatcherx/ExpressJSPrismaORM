const express = require('express')
const app = express();
const {PrismaClient} = require('@prisma/client')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(express.json())
const prisma = new PrismaClient()

app.get("/",async(req,res)=>{

	const user = await prisma.food.findMany();
	res.json(user)
})

app.delete("/delete/:id",async(req,res)=>{
	let id = parseInt(req.params.id)
	const user = await prisma.food.delete({
		where:{
			id:id
		}
	});
	res.json("success delete" +  id)
})



app.get("/details/:name",async(req,res)=>{

	const user = await prisma.food.findMany({
		where:{
			name:req.params.name
		} 
	});
	res.json(user)
})
app.post("/post",async(req,res)=>{
	let {name,price} = req.body
	try{

	const user = await prisma.food.create({
		data:{
			name:name,
			price:parseInt(price)
		}
	})
	res.json({'status':'created',"data":JSON.stringify(user)})
}catch(err){
	console.log(err)
	res.json(err)
}
})
app.listen(3000,()=>console.log("server run 3000"));