const mysql = require('mysql2/promise');
const redis = require('redis');

const client = redis.createClient()





async function printColumnNames() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deletemedb'
  });

  const [columns] = await connection.query('DESCRIBE person');
  await connection.end();

  const columnNames = columns.map(column => column.Field);
  return columnNames
}



async function getAllData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deletemedb'
  });

  const [rows] = await connection.query('SELECT * FROM person');
  await connection.end();
 
  return rows
}


async function cacheAll(){
  let x = await getAllData()
  let y = await printColumnNames()
  client.connect()
  

  
  x.forEach(i => {
    let z = Object.values(x)
    client.hSet(i.display_Name,y[0],i.user_Id)
    client.hSet(i.display_Name,y[2],i.picture_Url)
    client.hSet(i.display_Name,y[3],i.language)
    client.hSet(i.display_Name,y[4],i.edit_Name)
    // client.hSet(i.display_Name,y[5],i.tag)
    // client.hSet(i.display_Name,y[6],i.increment)
    
    
  });

  
  

  client.quit()
 

};


//();
// cacheAll();


(async ()=>{
  client.connect()

  let sample = await client.hGetAll("yun")
  console.log(sample)
  client.quit()
})();













