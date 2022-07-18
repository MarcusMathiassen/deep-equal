// from https://github.com/epoberezkin/fast-deep-equal
'use strict';

const fs = require('fs');
const doT = require('dot');
doT.templateSettings.strip = false;

const jst = doT.compile(fs.readFileSync('./src/index.jst', 'utf8'));
try { fs.mkdirSync('./react'); }  catch(e) {}
fs.writeFileSync('./index.js', jst({react: false}));
fs.writeFileSync('./react/index.js', jst({react: true}));