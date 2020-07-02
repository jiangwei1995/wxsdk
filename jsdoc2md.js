const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const docs = jsdoc2md.renderSync({ files: 'lib/**/*.js' })
fs.writeFileSync("./jsdoc.md", docs);