import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import blogRoutes from './routes/blogs';

const app: Express = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);

// connection to db
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB & listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error: any) => {
    console.log(error.message);
  });
