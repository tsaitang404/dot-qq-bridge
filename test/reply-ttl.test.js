import test from 'node:test';
import assert from 'node:assert/strict';
import { readConfig } from '../src/config.js';

test('reply TTL keeps default and supports owner C2C hour window', () => {
  assert.equal(readConfig({}).replyTtlMs, 240000);
  for (const seconds of [10, 300, 3300, 3600]) {
    assert.equal(readConfig({ REPLY_TTL_SECONDS: String(seconds) }).replyTtlMs, seconds * 1000);
  }
  for (const seconds of ['9', '3601', 'NaN', '1.5']) {
    assert.throws(() => readConfig({ REPLY_TTL_SECONDS: seconds }), /Invalid REPLY_TTL_SECONDS/);
  }
});
