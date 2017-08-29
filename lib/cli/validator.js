const phantom = require('phantom');

module.exports = async (path) => {
  const instance = await phantom.create([
    '--web-security=no'
  ]);
  const page = await instance.createPage();

  await page.on("onError", function(message, trace) {
    throw new Error('Build failed: ' + message);
  });

  await page.open(path);
  await instance.exit();
};
