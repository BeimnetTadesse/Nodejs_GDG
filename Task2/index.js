// index.js
const utility = require('lodash');

// Example array of numbers
const numbers = [10, 5, 8, 25, 3, 13];

// Find the maximum and minimum numbers using lodash
const max = utility.max(numbers);
const min = utility.min(numbers);

// Log the results
console.log(`Maximum Number: ${max}`);
console.log(`Minimum Number: ${min}`);
