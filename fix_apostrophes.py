#!/usr/bin/env python3
import re
import sys

def fix_apostrophes_in_jsx(file_path):
    """Fix unescaped apostrophes in JSX text content only."""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split content into lines for easier processing
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        # Skip lines that are imports, exports, or pure JS code
        if any(line.strip().startswith(x) for x in ['import ', 'export ', 'const ', 'let ', 'var ', 'function ', '//', '/*', '*']):
            fixed_lines.append(line)
            continue
            
        # Skip lines inside quotes that are part of JS code (not JSX text)
        if '=' in line and ('"' in line or "'" in line):
            # This might be an assignment, check if it's JSX text or JS code
            # Look for patterns like className="..." or other attributes
            if re.match(r'^\s*\w+\s*=\s*["\']', line.strip()):
                fixed_lines.append(line)
                continue
        
        # Process JSX text content
        # Look for text between > and < that contains apostrophes
        def replace_in_jsx_text(match):
            text = match.group(0)
            # Replace apostrophes with &apos; but only in the text content
            return text.replace("'", "&apos;")
        
        # Pattern to match text content between tags
        # This will match content like >text here<
        pattern = r'>[^<>]*\'[^<>]*<'
        
        # Also handle text at the start of lines in JSX content
        if re.search(r'^\s*[^<>=]*\'', line) and not line.strip().startswith('{'):
            # This is likely JSX text content at the start of a line
            # Replace apostrophes that aren't part of attributes
            parts = line.split('"')
            new_parts = []
            for i, part in enumerate(parts):
                if i % 2 == 0:  # Outside quotes
                    # Check if this is inside a tag definition
                    if '<' in part and '>' not in part:
                        # Inside a tag, don't replace
                        new_parts.append(part)
                    else:
                        # Replace apostrophes in text content
                        new_part = part
                        # Only replace if not part of a closing tag or attribute
                        if not re.search(r'=\s*$', part):
                            new_part = part.replace("'", "&apos;")
                        new_parts.append(new_part)
                else:
                    # Inside quotes, don't replace
                    new_parts.append(part)
            line = '"'.join(new_parts)
        
        # Apply the pattern-based replacement
        line = re.sub(pattern, replace_in_jsx_text, line)
        
        fixed_lines.append(line)
    
    return '\n'.join(fixed_lines)

# Process the files
files_to_fix = [
    '/Users/thakr/.local/dev/thakr.io/app/blog/deepseek-ai-model-agnostic-development/DeepSeekAIBlogContent.tsx',
    '/Users/thakr/.local/dev/thakr.io/app/blog/retrieval-augmented-generation/RAGBlogContent.tsx',
    '/Users/thakr/.local/dev/thakr.io/app/blog/series/[slug]/not-found.tsx',
    '/Users/thakr/.local/dev/thakr.io/app/blog/the-rise-of-deep-sea-ai/DeepSeaAIBlogContent.tsx'
]

for file_path in files_to_fix:
    print(f"Processing {file_path}...")
    try:
        fixed_content = fix_apostrophes_in_jsx(file_path)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        print(f"Fixed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print("Done!")