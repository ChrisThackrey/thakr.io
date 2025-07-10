const { exec } = require('child_process');
const path = require('path');

const projectDir = '/Users/thakr/.local/dev/thakr.io';
process.chdir(projectDir);

exec('npx tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    console.error('TypeScript errors found:');
    console.error(stderr || stdout);
    process.exit(1);
  } else {
    console.log('No TypeScript errors found!');
    console.log(stdout);
  }
});