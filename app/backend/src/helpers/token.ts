import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'vascodagama';

const generateToken = (pass: string) => {
  const token = jwt.sign(pass, secret);
  return token;
};

export default generateToken;
