var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
var request;
var db;
var xhr;

window.onload=()=>{
	DBSetValue().then(xhrGet).then(dataInput).then(inputEnd).catch(Error);
};
function DBSetValue()
{
	return new Promise((res,rej)=>{			
		request=indexedDB.open("MonopolyLearnData",1);
		request.onsuccess=e=>{
			db=e.target.result;
			console.log(`indexedDB資料庫MonopolyLearnData打開成功`);
			res();
		}
		request.onerror=e=>{rej(e.target.errorCode);}
		request.onupgradeneeded=e=>{
			db=e.target.result;
			console.log(`版本更新...`);
			let objectStore=db.createObjectStore("dataSet",{keyPath:"kind"});
			let objectStore2=db.createObjectStore("quesDatabase",{keyPath:"id"});
		}
	});
}
function xhrGet()
{
	return new Promise((res,rej)=>{
		let xhr= new XMLHttpRequest();
		xhr.open("get", "Setting/setting.json", true);
		xhr.send();
		xhr.onload=()=>{res(xhr.responseText);};
	});
}
function dataInput(data)
{
	console.log(`開始輸入資料`);
	return new Promise((res,rej)=>{
			let transaction=db.transaction(["dataSet"],"readwrite");
			let objectStore=transaction.objectStore("dataSet");
			let DATA=JSON.parse(data);
			let req1=objectStore.put(DATA.bg);
			let req2=objectStore.put(DATA.button);
			let req3=objectStore.put(DATA.sound);
			transaction.oncomplete=e=>{
				res();
			};
			transaction.onerror=e=>{
				rej(e.target.errorCode);
			}
	});
}
function inputEnd()
{
	console.log("事務完成！");
	window.location.href="MonopolyLearn.html";
}
function Error(e)
{
	console.log(e);
}