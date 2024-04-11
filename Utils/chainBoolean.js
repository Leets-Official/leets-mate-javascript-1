function chainBoolean(...callbacks) {
  return (...args) =>
    callbacks.every((callback) => {
      if (typeof callback === 'function') {
        return callback(...args);
      }
    });
}

module.exports = chainBoolean;
