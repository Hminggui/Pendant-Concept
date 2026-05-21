import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const PREMIUM_EASE = `[0.22, 1, 0.36, 1]`;
const PREMIUM_DURATION = `1.8`; // Increased duration for that smooth premium feel

// Replace explicit transitions 
content = content.replace(/transition=\{\{([^}]+)\}\}/g, (match, inner) => {
  if (inner.includes('Infinity') || inner.includes('repeat')) return match; 
  if (inner.includes('!animationsEnabled')) return match; 
  
  let targetInner = inner;
  // If it's a multiline block like transition={{ \n duration: 3.5 ... }} it might not match well.
  // The regex transition=\{\{([^}]+)\}\} only matches up to the first `}`. Let's see if that's safe.
  // Most of our transitions are single-line as seen in grep. e.g. transition={{ delay: 0.5, duration: 1.5 }}
  
  let delayMatch = inner.match(/delay:\s*([^,\n]+)/);
  let delayStr = delayMatch ? delayMatch[1].trim() : null;
  
  if (delayStr) {
     return `transition={{ duration: ${PREMIUM_DURATION}, ease: ${PREMIUM_EASE}, delay: ${delayStr} }}`;
  } else {
     return `transition={{ duration: ${PREMIUM_DURATION}, ease: ${PREMIUM_EASE} }}`;
  }
});

// Update MotionConfig
content = content.replace(
  /<MotionConfig transition=\{\!animationsEnabled \? \{ duration: 0 \} : undefined\}>/,
  `<MotionConfig transition={!animationsEnabled ? { duration: 0 } : { duration: ${PREMIUM_DURATION}, ease: ${PREMIUM_EASE} }}>`
);

// Also set viewport margin so animations trigger smoothly before entering fully and stay smoother.
// Replace `viewport={{ once: true }}` with `viewport={{ once: false, margin: "-10%" }}` if needed, 
// though the user feels exit animations are too fast.
// Framer motion uses symmetric ease for exit if not redefined.
// Adding a specialized `viewport={{ once: false, amount: 0.2 }}` globally is tricky, let's keep it simple.

fs.writeFileSync('src/App.tsx', content);
console.log('Update Complete');
