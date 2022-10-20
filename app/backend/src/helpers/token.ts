import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (pass: string, role: string) => {
  const token = sign({ pass, role }, 'vascodagama', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

export default generateToken;
