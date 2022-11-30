const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



//@desc Create ticket
//@route POST/api/tickets
//@access Private/Protected
 const createTicket = asyncHandler( async(req, res) => {
    const { product, description } = req.body
    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product and description')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})


//@desc Get user ticket
//@route GET/api/tickets
//@access Private/Protected
 const getTickets = asyncHandler( async(req, res) => {
    //Get user using the ID in the jwt
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
})



//@desc Get single ticket
//@route GET/api/tickets/:id
//@access Private/Protected
const getSingeTicket = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Thicket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
    res.status(200).json(ticket)
    
})


//@desc Delete user ticket
//@route DELETE /api/tickets/:id
//@route Private/Protected
const deleteTicket = asyncHandler( async(req, res) => {
    //Get user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Thicket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true})
    // await ticket.remove()
    // res.status(200).json({ success: true })

})


//@desc Update ticket
//@route PUT/api/tickets/:id
//@access Private/Protected
const updateTicket = asyncHandler( async(req, res) => {
    
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true})
      
    res.status(200).json(updatedTicket)
})


module.exports = {
    getTickets,
    getSingeTicket,
    createTicket,
    updateTicket,
    deleteTicket
}