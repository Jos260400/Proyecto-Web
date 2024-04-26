const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'tu_uri_de_conexion_mongodb';

app.use(express.json());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {

    await client.connect();
    console.log('Conectado a la base de datos');
    

    app.get('/', (req, res) => {
      res.send('Hola Mundo!');
    });

 
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

