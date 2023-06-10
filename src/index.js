import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const readData = fs.readFileSync(fullPath, 'utf-8');
  const object = JSON.parse(readData);
  return object;
};

const gendiff = (filePath1, filePath2) => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const keys = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqueKeys = _.sortBy(_.uniq(keys));
  const result = {};
  uniqueKeys.forEach((key) => {
    if (!Object.hasOwn(file1, [key])) {
      result[`+ ${key}`] = file2[key];
      return result;
    }
    if (!Object.hasOwn(file2, [key])) {
      result[`- ${key}`] = file1[key];
      return result;
    }
    if (file1[key] === file2[key]) {
      result[`  ${key}`] = file2[key];
    } else {
      result[`- ${key}`] = file1[key];
      result[`+ ${key}`] = file2[key];
    }
    return result;
  });
  return result;
};
export default gendiff;
