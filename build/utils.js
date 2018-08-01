var path = require('path')
var glob = require('glob');
//获取多级的入口文件
exports.getMultiEntry = function (globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-6);
    console.log('tmp:' + tmp);
	var pathsrc = tmp[0]+'/'+tmp[1]+'/'+tmp[2]+'/'+tmp[3];
	if( tmp[0] == 'src' ){
		pathsrc = tmp[1]+'/'+tmp[2]+'/'+tmp[3];
	}
	//console.log(pathsrc)
    pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
    
    console.log(pathname+'-----------'+entry);

  });
  console.log('**********************************************************');
  console.log(entries);
  return entries;

}
