function logError(error, location) {
  console.error(`❌ Error in ${location}:`, error.message);
}

module.exports = logError;
