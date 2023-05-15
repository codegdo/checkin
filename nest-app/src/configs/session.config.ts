import { registerAs } from '@nestjs/config';

import * as fs from 'fs';
import * as path from 'path';

let files = [];

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute);
    } else {
      files.push(absolute);
    }
  }
};


export const sessionConfig = registerAs('session', () => {
  const entities = fs.readdirSync(path.join(__dirname, '../../', 'src/sql/main')).filter(file => path.extname(file) === '.sql').map(file => file)

  console.log(path.join(path.dirname(__filename), '../', 'models'), entities);


  return {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: parseInt(process.env.SESSION_MAX_AGE ?? '3600000', 10), // 60000
    },
  };
});
