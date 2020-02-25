exports.parseJSON = function(data, defaultData) {
  try {
    return JSON.parse(data);
  } catch {
    console.log(data)
    this.logger.error(`parse ${data} error`);
    return defaultData;
  }
};
