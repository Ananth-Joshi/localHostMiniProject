import mysql from 'mysql2/promise'
export const connectDB=async()=>{
    try{
    const connection=await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'ananthj82',
        database:'petmanagement',
        port:"3306",
        dateStrings:true
})
    console.log('CONNECTED SUCCESSFULLY TO DATABASE ')
    return connection;
}catch(e){
    {console.log('Error connecting to Database'+e)}
}
    
}