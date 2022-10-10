import { Request, Response, NextFunction } from 'express';

const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default loginValidation;
