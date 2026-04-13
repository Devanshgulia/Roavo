const fs = require('fs');
let content = fs.readFileSync('app/planner/page.tsx', 'utf8');

// Global Background & Borders
content = content.replace(/bg-gray-50(?![a-zA-Z0-9\/-])/g, 'bg-gray-50 dark:bg-slate-800/50');
content = content.replace(/bg-white(?![a-zA-Z0-9\/-])/g, 'bg-white dark:bg-slate-900/50 dark:backdrop-blur-sm');
content = content.replace(/border-gray-200(?![a-zA-Z0-9\/-])/g, 'border-gray-200 dark:border-slate-700/50');
content = content.replace(/border-gray-300(?![a-zA-Z0-9\/-])/g, 'border-gray-300 dark:border-slate-600/50');

// Typography
content = content.replace(/text-gray-900(?![a-zA-Z0-9\/-])/g, 'text-gray-900 dark:text-gray-50');
content = content.replace(/text-gray-800(?![a-zA-Z0-9\/-])/g, 'text-gray-800 dark:text-gray-200');
content = content.replace(/text-gray-700(?![a-zA-Z0-9\/-])/g, 'text-gray-700 dark:text-gray-300');
content = content.replace(/text-gray-600(?![a-zA-Z0-9\/-])/g, 'text-gray-600 dark:text-gray-400');
content = content.replace(/text-gray-500(?![a-zA-Z0-9\/-])/g, 'text-gray-500 dark:text-gray-400');

// Specific logic string adjustments that exist inside variables/template strings
content = content.replace(/'bg-white text-gray-700 border border-gray-300/g, "'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600");
content = content.replace(/'border-gray-200 bg-white/g, "'border-gray-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50");

fs.writeFileSync('app/planner/page.tsx', content);
console.log('Successfully modernized tailwind classes!');
