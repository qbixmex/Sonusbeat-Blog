import jwt from 'jsonwebtoken';
import 'dotenv/config'; // para que lea .env.local si lo corres directamente

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Falta JWT_SECRET en el entorno');
}

const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' });

console.log('Tu JWT válido por 1 hora:\n');
console.log(token);