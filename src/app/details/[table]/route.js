import { NextResponse } from "next/server";
import { connectDB } from "../../db/connectDB";

export async function GET(request,{params}){
    const connect=await connectDB();
    let data=''
    if(params.table!=='CENTER')
        data=await connect.query(`SELECT * FROM ${params.table}`)
    else
        data=await connect.query(`SELECT C.*, COUNT(DISTINCT P.PET_ID) AS NO_OF_PETS, COUNT(DISTINCT V.V_ID) AS NO_OF_VOLUNTEERS FROM CENTER AS C LEFT JOIN PET AS P ON C.CID = P.CID LEFT JOIN VOLUNTEERS AS V ON C.CID = V.CID GROUP BY C.CID`)
    connect.end()
    return NextResponse.json(data[0])
}

export async function POST(request,{params}){
    const connect=await connectDB();
    const data=await request.json()
    switch(params.table){
        case 'CENTER':
            await connect.query(`INSERT INTO ${params.table} VALUES(${data.CID},\'${data.LOCATION}\',\'${data.CONTACT_INFO}\')`)
            break;
        case 'ALLOCATION':
            await connect.query(`INSERT INTO ${params.table} VALUES(\'${data.A_NAME}\',${data.A_AMOUNT},${data.CID})`)
            break;
        case 'PET':
            await connect.query(`INSERT INTO ${params.table} VALUES(${data.PET_ID},\'${data.NAME}\',\'${data.TYPE}\',${data.AGE},\'${data.VACCINATION}\',\'${data.GENDER}\',\'${data.LOCATION}\',\'${data.SEVERITY}\',\'${data.DESCRIPTION}\',${data.CID},\'${data.PCARE}\',${data.V_ID})`)
            break;
        case 'DONATION':
            await connect.query(`INSERT INTO ${params.table} VALUES(${data.DONATION_ID},\'${data.NAME}\',\'${data.PH_NO}\',\'${data.PAYMENT_INFO}\',${data.AMOUNT})`)
        case 'VOLUNTEERS':
            await connect.query(`INSERT INTO ${params.table} VALUES(${data.V_ID},\'${data.NAME}\',${data.AGE},\'${data.PHONE}\',\'${data.ADDRESS}\',\'${data.EXPERTISE}\',\'${data.EMPLOYMENT}\',\'${data.AVAILABLE_STATUS}\',\'${data.AVAILABLE_DATE}\',\'${data.AVAILABLE_TIME}\',${data.CID})`)
        default:
            return NextResponse.json({message:'POST request on Non-Existent Table'},{status:404})
        }
    connect.end();
    return NextResponse.json({message:'successfully inserted'})
}

export async function DELETE(request,{params}){
    const connect=await connectDB();
    const data=await request.json();
    switch(params.table){
        case 'ALLOCATION':
            await connect.query(`DELETE FROM ALLOCATION WHERE(A_NAME=\'${data.A_NAME}\' AND A_AMOUNT=${data.A_AMOUNT} AND CID=${data.CID})`)
            break;
        case 'PET':
            await connect.query(`DELETE FROM PET WHERE(PET_ID=${data.PET_ID})`)
            break;
        case 'CENTER':
            await connect.query(`DELETE FROM CENTER WHERE(CID=${data.CID})`)
            break;
        case 'DONATION':
            await connect.query(`DELETE FROM DONATION WHERE(DONATION_ID=${data.DONATION_ID})`)
            break;
        case 'VOLUNTEERS':
            await connect.query(`DELETE FROM VOLUNTEERS WHERE(V_ID=${data.V_ID})`)
            break;
        default:
            return NextResponse.json({message:'DELETE request on Non-Existent Table'},{status:404})
    }
    connect.end()
    return NextResponse.json({message:'successfully deleted!!!'})
}