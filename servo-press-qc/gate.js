(function(){
var HASH="698eddbc91b225fd427a99e6d0c194e32cb8c99dd4322cb25c5cd52c52184ef2",KEY="qc-unlocked";
function ok(){try{return localStorage.getItem(KEY)===HASH}catch(e){return false}}
if(ok())return;
var st=document.createElement("style");
st.textContent="body>*:not(#qc-gate){visibility:hidden!important}#qc-gate{position:fixed;inset:0;z-index:2147483647;background:var(--page,#fff);color:var(--text,#221E32);display:flex;align-items:center;justify-content:center;padding:16px;font-family:var(--f,Arial,Helvetica,sans-serif)}#qc-gate form{background:var(--panel,#fff);border:1px solid var(--edge,#C5CDE3);border-radius:12px;padding:24px;width:100%;max-width:340px;text-align:center}#qc-gate h2{margin:0 0 4px;color:var(--ink,#291E44);font-size:22px}#qc-gate p{margin:0 0 16px;color:var(--muted,#5A5670);font-size:15px}#qc-gate input{width:100%;font-size:24px;text-align:center;letter-spacing:.4em;padding:10px;border:1px solid var(--edge,#C5CDE3);border-radius:8px;background:var(--page,#fff);color:inherit}#qc-gate button{margin-top:12px;width:100%;font-size:17px;padding:12px;border:0;border-radius:4px;background:var(--btn,#291E44);color:var(--on-ink,#fff);font-weight:600}#qc-gate .err{color:#A8261D;min-height:1.3em;margin-top:8px;font-size:14px}";
document.head.appendChild(st);
function sha(s){var b=new TextEncoder().encode(s);return crypto.subtle.digest("SHA-256",b).then(function(d){return Array.from(new Uint8Array(d)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")})}
function build(){
var g=document.createElement("div");g.id="qc-gate";
g.innerHTML='<form><h2>Servo Press QC</h2><p>Enter the passcode to continue.</p><input type="password" inputmode="numeric" autocomplete="off" aria-label="Passcode" autofocus><div class="err" role="alert"></div><button type="submit">Unlock</button></form>';
document.body.appendChild(g);
var f=g.querySelector("form"),i=g.querySelector("input"),e=g.querySelector(".err");
f.addEventListener("submit",function(ev){ev.preventDefault();sha(i.value.trim()).then(function(h){
if(h===HASH){try{localStorage.setItem(KEY,HASH)}catch(x){}st.remove();g.remove()}
else{e.textContent="Incorrect passcode";i.value="";i.focus()}})});
i.focus();
}
if(document.body)build();else document.addEventListener("DOMContentLoaded",build);
})();
