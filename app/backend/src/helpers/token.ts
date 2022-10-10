import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'vascodagama';

const generateToken = (pass: string) => {
  const token = sign({ pass }, secret);
  return token;
};

export default generateToken;
