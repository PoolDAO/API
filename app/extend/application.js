exports.parseJSON = function(data, defaultData) {
  try {
    return JSON.parse(data);
  } catch {
    this.logger.error(`parse ${data} error`);
    return defaultData;
  }
};
