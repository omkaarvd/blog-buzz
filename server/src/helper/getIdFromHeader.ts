import jwt from 'jsonwebtoken';

const getIdFromHeader = (header: any) => {
  if (!header) return Error('No header provided');
  const decoded: any = jwt.verify(header, process.env.JWT_SECRET!);
  return decoded.id;
};

export { getIdFromHeader };
