const express = require('express')
const { createTicket, getTickets, getSingeTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getSingeTicket).delete(protect, deleteTicket).put(protect, updateTicket)

//Alternative
// router.get('/', protect, getTickets)
// router.post('/', protect, createTicket)

module.exports = router