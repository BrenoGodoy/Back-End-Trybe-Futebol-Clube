import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const secret = 'vascodagama';

const generateToken = (pass: string, role: string) => {
  const token = sign({ pass, role }, secret);
  return token;
};

export default generateToken;
