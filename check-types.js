const { execSync } = require('child_process');

try {
  console.log('Running typecheck...');
  const output = execSync('npx tsc --noEmit', { 
    encoding: 'utf8',
    stdio: 'pipe' 
  });
  console.log('No TypeScript errors found!');
} catch (error) {
  console.log('TypeScript errors found:');
  console.log(error.stdout || error.message);
}