(function(root){
'use strict';
const KEY='dimmy-maca-world-v1';
const defaults=()=>({version:1,profile:{one:'dimmy',two:'maca',anniversary:''},memories:[],notes:[]});
function validDay(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const day=new Date(value+'T12:00:00Z');return Number.isFinite(+day)&&day.toISOString().slice(0,10)===value;}
function text(value,max,required=true){return typeof value==='string'&&value.length<=max&&(!required||value.trim().length>0);}
function validate(data){
 if(!data||data.version!==1||!data.profile||!text(data.profile.one,30)||!text(data.profile.two,30)||!Array.isArray(data.memories)||!Array.isArray(data.notes)||data.memories.length>300||data.notes.length>500)throw Error('This doesn’t look like a valid Our Little World backup.');
 if(data.profile.anniversary!==''&&!validDay(data.profile.anniversary))throw Error('The anniversary date is invalid.');
 const ids=new Set();
 for(const m of data.memories){if(!m||!text(m.id,80)||ids.has(m.id)||!text(m.title,100)||!text(m.body,3000,false)||!validDay(m.date)||typeof m.photo!=='string'||(m.photo!==''&&(!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(m.photo)||m.photo.length>2000000)))throw Error('A memory in this backup is invalid.');ids.add(m.id);}
 for(const n of data.notes){if(!n||!text(n.id,80)||ids.has(n.id)||!text(n.from,30)||!text(n.to,30)||!text(n.body,5000)||!validDay(n.date))throw Error('A note in this backup is invalid.');ids.add(n.id);}
 // Keep only recognized data; imported objects never become application configuration.
 return {version:1,profile:{one:data.profile.one.trim(),two:data.profile.two.trim(),anniversary:data.profile.anniversary},memories:data.memories.map(m=>({id:m.id,title:m.title,body:m.body,date:m.date,photo:m.photo})),notes:data.notes.map(n=>({id:n.id,from:n.from,to:n.to,body:n.body,date:n.date}))};
}
function save(storage,data){const clean=validate(data);try{storage.setItem(KEY,JSON.stringify(clean));}catch{throw Error('This browser couldn’t save that. Your existing keepsakes are unchanged. Download a backup and free some browser storage, then try again.');}return clean;}
function daysTogether(date,today){if(!validDay(date)||!validDay(today))return null;return Math.floor((Date.parse(today+'T12:00:00Z')-Date.parse(date+'T12:00:00Z'))/86400000)+1;}
root.WorldCore={KEY,defaults,validate,save,validDay,daysTogether};
})(globalThis);
