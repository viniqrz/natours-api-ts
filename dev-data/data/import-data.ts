import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Tour } from '../../src/models/tourModel';

dotenv.config();

const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD as string
) as string;

console.log(DB);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

console.log(tours);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
