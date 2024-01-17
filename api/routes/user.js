const express = require( 'express' )
const { userSignup, userLogin, loginWithGoogle, userLogout } = require( '../controller/user' )
const router = express.Router()

// User Auth
router.post( '/signup', userSignup )
router.post( '/login', userLogin )
router.post( '/loginWithGoogle', loginWithGoogle )
// router.post('/logout', userLogout); // New route for user logout

module.exports = router
