const path = require('path');
const fs = require('fs');

module.exports = (compilerName, basename) => {
  const tmp = require('tmp');
  const file = tmp.fileSync({postfix: '.html', keep: true});

  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${basename} over ${compilerName}</title>
</head>
<body>
<script src="${basename}.${compilerName}.js"></script>
</body>
</html>
`;

  fs.writeFileSync(file.name, template);

  return {file: file.name, directory: path.dirname(file.name)};
};
