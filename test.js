var http = require('http');  
var qs = require('querystring'); 
var r = require('./tmts');
  
var data = {
    'uid': '',
    'platForm': 'h5',
    'qyid': 'bcbc1ed362d1b2846b39185c5a37211f',
    'agenttype': 236,
    'ptid': '02028001010000000000',
    'type': 'mp4',
    'nolimit': 0,
    'k_ft1': 8,
    'rate': 2,
    'p': '',
    'deviceid': 'bcbc1ed362d1b2846b39185c5a37211f',
    'codeflag': 1,
    'qd_v': 1,
    'qdy': 'u',
    'qds': 0,
    'tm': 1543326983, //String(new Date().getTime()).substr(0,10),
    'src': '02028001010000000000',
};//这是需要提交的数据  
  
  
var content = qs.stringify(data);  
  
var options = {  
    hostname: 'cache.m.iqiyi.com',  
    port: 80,  
    path: '/tmts/758010400/5179d51af88ca6cd0eb3eec0c2c36b4d/?' + content,  
    method: 'GET'  
};  

options.path = options.path + '&vf=' + r.default.cmd5x(options.path);
  
var req = http.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('BODY: ' + chunk);  
    });  
});  
  
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
  
req.end();