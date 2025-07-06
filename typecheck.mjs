import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runTypecheck() {
  try {
    const { stdout, stderr } = await execAsync('pnpm run typecheck', {
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });
    console.log('TypeScript check passed!');
    if (stdout) console.log(stdout);
  } catch (error) {
    console.log('TypeScript errors found:');
    console.log(error.stdout || error.message);
    if (error.stderr) console.log(error.stderr);
  }
}

runTypecheck();