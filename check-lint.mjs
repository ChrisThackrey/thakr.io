#!/usr/bin/env node

import { execSync } from 'child_process'

try {
  console.log('Running ESLint...')
  const result = execSync('npx eslint . --ext .ts,.tsx,.js,.jsx --format=compact', { encoding: 'utf8' })
  console.log('Linting completed successfully!')
  console.log(result)
} catch (error) {
  console.log('Linting errors found:')
  console.log(error.stdout)
}