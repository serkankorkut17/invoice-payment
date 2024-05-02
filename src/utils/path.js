import path from 'path';

const mainDir = process.cwd();

const dbPath = path.join(mainDir, 'src', 'utils', 'mydatabase.sqlite');

export default dbPath;