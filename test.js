var validPath = require('./index'),
	log = console.log;


log(validPath());
log(validPath(''));
log(validPath('    '));
log(validPath('a/b//c'));
log(validPath('a/b//c', {sepDuplications: true}));
log(validPath('a\\b\\c'));
log(validPath('a\\b\\c', {sep: '\\'}));
log(validPath('a\\b\\\\c', {sep: '\\'}));
log(validPath('a\\b\\\\c', {sep: '\\', sepDuplications: true}));
