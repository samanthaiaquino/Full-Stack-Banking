
const { PrismaClient, FinanceType } = require( '@prisma/client' )
const prisma = new PrismaClient()

exports.addFinance = async ( req, res ) =>
{
    const userData = req?.userData

    try
    {
        const {
            financeType,
            amount,
            date,
            purpose
        } = req.body
        if (
            !financeType ||
            !amount ||
            !date
        )
        {
            return res.status( 409 ).json( {
                message: 'Enter financeType, amount, date !',
            } )
        }

        const financeCreated = await prisma.finance.create( {
            data: {
                amount,
                financeType,
                date,
                purpose,
                User: {
                    connect: {
                        id: userData?.id
                    }
                }
            }
        } )

        return res.status( 200 ).json( {
            message: "Finance added successfully!",
            data: financeCreated
        } )

    } catch ( err )
    {
        console.log( 'error', err )
        return res.status( 401 ).json( {
            message: err,
        } )
    }
}
exports.getFinance = async ( req, res ) =>
{
    const userData = req?.userData

    const { skip = 0, take = 100, type, to, from } = req.query

    if ( type )
    {
        if ( ![ FinanceType.CREDIT, FinanceType.DEBIT ].includes( type ) )
        {
            return res.status( 400 ).json( {
                message: "Invalid type!",
            } )
        }
    }


    try
    {
        const getAllFinance = await prisma.finance.findMany( {
            where: {
                userId: userData.id,
                ...( type && {
                    financeType: type
                } ),
                ...( to && from && {
                    date: {
                        lte: from,
                        gte: to,
                    }
                } )
            },
            select: {
                id: true,
                financeType: true,
                amount: true,
                date: true,
                purpose: true
            },
            skip: +skip,
            take: +take,
        } )

        const count = await prisma.finance.count( {
            where: {
                userId: userData.id,
                ...( type && {
                    financeType: type
                } ),
                ...( to && from && {
                    date: {
                        lte: from,
                        gte: to,
                    }
                } )
            },
        } )

        return res.status( 200 ).json( {
            message: "All Finance Data!",
            count,
            data: getAllFinance,
            nextFrom: count > +take + +skip ? +take + +skip : false
        } )

    } catch ( err )
    {
        console.log( 'error', err )
        return res.status( 401 ).json( {
            message: err,
        } )
    }
}
exports.getTotal = async ( req, res ) =>
{

    try
    {

        const userData = req.userData
        const { to, from } = req.query

        const total = await prisma.finance.groupBy( {
            by: [ "financeType" ],
            where: {
                userId: userData.id,
                ...( to && from && {
                    date: {
                        lte: from,
                        gte: to,
                    }
                } )
            },
            _sum: {
                amount: true
            }
        } )
        return res.status( 200 ).json( {
            message: "All Finance Data!",
            data: total,
        } )

    } catch ( err )
    {
        console.log( 'error', err )
        return res.status( 401 ).json( {
            message: err,
        } )
    }
}