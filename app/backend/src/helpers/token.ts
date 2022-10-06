import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'vascodagama';

const generateToken = (pass: string) => {
  const jwtConfig = {
    expiresIn: '1d',
  };
  const token = sign({ pass }, secret, jwtConfig);
  return token;
};

export default generateToken;
