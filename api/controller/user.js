const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )

const { PrismaClient, AuthType } = require( '@prisma/client' )
const prisma = new PrismaClient()

const { OAuth2Client } = require( 'google-auth-library' )
const client = new OAuth2Client( process.env.GOOGlE_AUTH_CLIENT_ID )

async function verify ( token )
{
  const ticket = await client.verifyIdToken( {
    idToken: token,
    audience: process.env.GOOGLE_AUTH_CLIENT_ID,
  } )

  const payload = ticket.getPayload()

  return payload
}

exports.userSignup = async ( req, res ) =>
{
  try
  {
    const {
      email,
      firstName,
      lastName,
      password,

    } = req.body
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password
    )
    {
      return res.status( 409 ).json( {
        message:
          'Enter email, firstName, lastName, password,!',
      } )
    }

    const isUserAlreadyExist = await prisma.user.findFirst( {
      where: {
        email
      }
    } )

    if ( isUserAlreadyExist )
    {
      return res.status( 409 ).json( {
        message: 'Email already exists!',
      } )
    }

    bcrypt.hash( password, 10, async ( err, hash ) =>
    {
      if ( err )
      {
        return res.status( 500 ).json( {
          error: err,
        } )
      } else
      {

        const userCreated = await prisma.user.create( {
          data: {
            email,
            firstName,
            lastName,
            password: hash
          }
        } )

        if ( userCreated )
        {
          const token = jwt.sign(
            {
              email: userCreated.email,
              userId: userCreated.id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '100000000h',
            },
          )

          return res.status( 200 ).json( {
            user: {
              id: userCreated.id,
              firstName,
              lastName,
              email,
            },
            token: token,
          } )
        }
      }
    } )


  } catch ( err )
  {
    console.log( 'error', err )
    return res.status( 401 ).json( {
      message: err,
    } )
  }
}

exports.userLogin = async ( req, res ) =>
{
  try
  {
    const { email, password } = req.body

    const user = await prisma.user.findFirst( { where: { email } } )

    // console.log(user);

    if ( !user )
    {
      return res.status( 401 ).json( {
        message: 'Invalid Credentials!',
      } )
    }

    bcrypt.compare( password, user.password, ( err, result ) =>
    {
      if ( err )
      {
        return res.status( 401 ).json( {
          message: 'auth failed',
        } )
      }
      if ( result )
      {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1000000000h',
          },
        )
        return res.status( 200 ).json( {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email,
          },
          token: token,
        } )
      } else
      {
        return res.status( 401 ).json( {
          message: 'Invalid Credentials!',
        } )
      }
    } )
  } catch ( err )
  {
    return res.status( 401 ).json( {
      message: err,
    } )
  }
}


exports.loginWithGoogle = async ( req, res ) =>
{
  try
  {
    const { credential } = req.body
    const user = await verify( credential )
    // Perform user authentication or account creation here
    if ( user )
    {
      const { email, given_name, family_name } = user

      let account

      account = await prisma.user.findFirst( {
        where: {
          email
        }
      } )


      if ( !account )
      {
        account = await prisma.user.create( {
          data: {
            email,
            firstName: given_name,
            lastName: family_name,
            authType: AuthType.GOOGLE,

          }
        } )
      }
      if ( account )
      {
        const token = jwt.sign(
          {
            email: account.email,
            userId: account.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1000000000h',
          },
        )
        return res.status( 200 ).json( {
          user: {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email,
          },
          token: token,
        } )
      } else
      {
        return res.status( 401 ).json( {
          message: 'Invalid Credentials!',
        } )
      }
    }


    // res.status( 200 ).json( user )
  } catch ( error )
  {
    console.log( "error", error )
    res.status( 401 ).send( 'Unauthorized' )
  }
}