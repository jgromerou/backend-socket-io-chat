import mongoose, { mongo } from 'mongoose';
import 'dotenv/config';

const uri = process.env.DATABASE_URI;
mongoose.connect(uri);

const datosConexion = mongoose.connection;
datosConexion.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});
