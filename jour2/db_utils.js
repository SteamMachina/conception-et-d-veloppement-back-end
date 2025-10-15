// 11. Se connecter à une bdd SQL en nodejs - 1
import { Client,Pool } from 'pg'

const client = new Client({
  host     : 'localhost',
  user     : 'postgres',
  password : 'root',
  database : 'mabase'
})

await client.connect()

try {
    const res = await client.query("Select * from users")
    console.log(res.rows) 
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}