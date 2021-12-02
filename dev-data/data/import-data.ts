import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { TourModel } from '../../src/models/TourModel';
import { UserModel } from '../../src/models/UserModel';

dotenv.config();

const DB = process.env.DB_URL?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD as string
) as string;

console.log(DB);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await TourModel.create(tours);
    await UserModel.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await TourModel.deleteMany();
    await UserModel.deleteMany();
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