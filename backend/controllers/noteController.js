const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/NoteModel')



//@desc Get notes for a ticket
//@route GET/api/tickets/:ticketId/notes
//@access Private/Protected
 const getNotes = asyncHandler( async(req, res) => {
     //Get user using the ID in the jwt
     const user = await User.findById(req.user.id)
     if(!user){
         res.status(401)
         throw new Error('User not found')
     }
     const ticket = await Ticket.findById(req.params.ticketId)
     if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')
     }
     const notes = await Note.find({ticket: req.params.ticketId})
     res.status(200).json(notes)
})



//@desc Create notes for a ticket
//@route POST/api/tickets/:ticketId/notes
//@access Private/Protected
const createNote = asyncHandler( async(req, res) => {
    //Get user using the ID in the jwt
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('User not Authorized')
    }
    const note = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    })
    res.status(200).json(note)
})


module.exports = {
    getNotes,
    createNote
}