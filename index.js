const express = require( 'express' )
const app = express()
const dotenv = require( 'dotenv' )
const cors = require( 'cors' )
const bodyParser = require( 'body-parser' )

const userRouter = require( "./api/routes/user" )
const financeRouter = require( "./api/routes/finance" )

const { PrismaClient } = require( '@prisma/client' )
const authMiddleware = require( './api/middleware/authMiddleware' )

//configs
dotenv.config()
app.use( bodyParser.urlencoded( { extended: true } ) )

app.use( bodyParser.json() )
app.use( cors() )

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Fixed typos
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/finance/", authMiddleware, financeRouter);



//prisma configuration

const prisma = new PrismaClient()

async function main ()
{
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
}

main()
    .then( async () =>
    {
        await prisma.$disconnect()
        console.log( 'DB connected!' )
    } )
    .catch( async ( e ) =>
    {
        console.error( e )
        console.log( 'DB disconnected!' )
        await prisma.$disconnect()
        process.exit( 1 )
    } )

const port = process.env.PORT || 4000

app.listen( port, () =>
{

    console.log( `Server started on port ${ port }` )
} )
module.exports = app
