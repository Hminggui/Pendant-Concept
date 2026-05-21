import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const PREMIUM_EASE = `[0.76, 0, 0.24, 1]`;
const PREMIUM_DURATION = `1.2`;

content = content.replace(/<MotionConfig transition=\{!animationsEnabled \? \{ duration: 0 \} : \{ duration: 1.2, ease: \[0.76, 0, 0.24, 1\] \}\}>/g, '<MotionConfig transition={!animationsEnabled ? { duration: 0 } : undefined}>');

// Restore original App.tsx roughly so we can re-apply the right regex
// Or better yet, we can manually fix the elements that use object shorthand.
