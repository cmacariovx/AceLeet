const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const readJsonFile = async (filename) => {
  try {
    const data = await readFile(filename, 'utf8');
    const jsonObject = JSON.parse(data);
    return jsonObject;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return null;
  }
};

module.exports = readJsonFile;
