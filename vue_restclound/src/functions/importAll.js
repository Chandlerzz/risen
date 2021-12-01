export default (files, callback) => {
  files.keys().forEach(key => {
    const mod = files(key).default;
    callback && callback(key, mod);
  });
};
