const { execSync } = require('child_process');

try {
  console.log('Running ESLint...');
  execSync('pnpm run lint', { 
    cwd: '/Users/thakr/.local/dev/thakr.io',
    stdio: 'inherit'
  });
  console.log('✅ Linting completed successfully!');
} catch (error) {
  console.error('❌ Linting failed');
  process.exit(1);
}