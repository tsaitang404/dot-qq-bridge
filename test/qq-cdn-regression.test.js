import test from 'node:test';
import assert from 'node:assert/strict';
import {incomingMedia,mediaMetadata} from '../src/qq-media.js';
import {voiceUrl} from '../src/qq-audio.js';
test('Tencent .com.cn image CDN accepted, lookalikes and insecure URLs rejected',()=>{
 const url='https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=test';
 const items=incomingMedia([{content_type:'image/jpeg',url}]);
 assert.equal(items[0].urls[0],url);assert.equal(mediaMetadata(items)[0].attachment_available,true);
 for(const bad of ['http://multimedia.nt.qq.com.cn/download','https://multimedia.nt.qq.com.cn.attacker.example/download','https://attacker.example/download','https://127.0.0.1/download','https://user:pass@multimedia.nt.qq.com.cn/download']) assert.throws(()=>voiceUrl(bad));
});
