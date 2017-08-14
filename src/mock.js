import fs from 'fs';
import path from 'path';

const mockFile = path.resolve(__dirname, '..', 'tmp/piparkaq-2318');

const mockFileData = fs.readFileSync(mockFile).toString();

export default mockFileData;
