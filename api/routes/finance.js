const express = require( 'express' )
const { addFinance, getFinance, getTotal } = require( '../controller/finance' )

const router = express.Router()

// user Auth

router.get( '/getTotal', getTotal )
router.post( '/deposit', addFinance ) // Updated route for deposit
router.post( '/withdraw', addFinance ) // Updated route for withdrawal
router.get( '/transactions', getFinance ) // Updated route for fetching transactions

module.exports = router
