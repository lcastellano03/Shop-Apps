// Builds index.html: a password-gated home page holding src/calculator.html encrypted (AES-256-GCM, PBKDF2).
import { readFileSync, writeFileSync } from 'node:fs';
import { randomBytes, pbkdf2Sync, createCipheriv } from 'node:crypto';
const PASSWORD = process.env.GLUE_PW || '3220';
const ITER = 200000;
const salt = randomBytes(16), iv = randomBytes(12);
const key = pbkdf2Sync(PASSWORD, salt, ITER, 32, 'sha256');
const c = createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(readFileSync('src/calculator.html')), c.final(), c.getAuthTag()]);
const payload = JSON.stringify({ s: salt.toString('base64'), i: iv.toString('base64'), c: ct.toString('base64'), n: ITER });
const tpl = readFileSync('src/home.html', 'utf8');
writeFileSync('index.html', tpl.replace('__PAYLOAD__', payload));
console.log('index.html written,', (tpl.length + payload.length), 'bytes');
