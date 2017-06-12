var validPath = require('./index'),
	log = console.log;


log('`undefined` =>', validPath());
log('`empty string` =>', validPath(''));
log('`whitespaces` =>', validPath('    '));
log('a/b//c =>', validPath('a/b//c'));
log('a/b//c, sepDuplications =>', validPath('a/b//c', {sepDuplications: true}));
log('a\\b\\c =>', validPath('a\\b\\c'));
log('a\\b\\c, sep \\ =>', validPath('a\\b\\c', {sep: '\\'}));
log('a\\b\\\\c, sep \\ =>', validPath('a\\b\\\\c', {sep: '\\'}));
log('a\\b\\\\c, sep \\, sepDuplications =>', validPath('a\\b\\\\c', {sep: '\\', sepDuplications: true}));
log('C:/path/to =>', validPath('C:/path/to'));
log('C: =>', validPath('C:'));
log('C:/ =>', validPath('C:/'));
log('C:\\\\path\\to, sepDuplications =>', validPath('C:\\\\path\\to', {sep: '\\', sepDuplications: true}));
log('C:/a/b/c, !disk =>', validPath('C:/a/b/c', {disk: false}));
log('C:/, !disk =>', validPath('C:/', {disk: false}));
log('C:\\\\a\\b\\c, sep \\, sepDuplications, !disk =>', validPath('C:\\a\b\c', {sep: '\\', sepDuplications: true, disk: false}))
log('a/b/con/c', validPath('a/b/con/c'));
log('a/b/na|me/c', validPath('a/b/na|me/c'));
