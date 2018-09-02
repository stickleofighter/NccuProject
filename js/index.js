var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
var request;
var db;
var xhr;

window.onload=()=>{
	request=indexedDB.open("MonopolyLearnData",1);
	request.onsuccess=rsuccess;
	request.onerror=rerror;
	request.onupgradeneeded=rupgradeneeded;
};
function rsuccess(e)
{
	console.log(`indexedDB資料庫MonopolyLearnData打開成功`);
}
function rerror(e)
{
	console.log(`IndexedDB打開失敗！\n錯誤碼：${e.target.errorCode}`);
}
function rupgradeneeded(e)
{
	db=e.target.result;
	console.log(`版本更新...`);
	let objectStore=db.createObjectStore("dataSet",{keyPath:"kind"});
	let objectStore2=db.createObjectStore("quesDatabase",{keyPath:"id"});
	valueInsert(e);
}
function valueInsert(e)
{
	let xhr= new XMLHttpRequest();
	xhr.open("get", "Setting/setting.json", true);
    xhr.send();
	xhr.onload=()=>{
		let transaction=db.transaction(["dataSet"],"readwrite");
		let objectStore=transaction.objectStore("dataSet");
		let DATA=JSON.parse(xhr.responseText);
		let req1=objectStore.put(DATA.bg);
		let req2=objectStore.put(DATA.button);
		transaction.oncomplete=e=>{
		console.log("事務完成！");
		//window.location.href="MonopolyLearn.html";
	}
	};
}
/*
var request=indexedDB.open("testdb",1);
var db;

function data(id,a,b,c)
{
	this["id"]=id;
	this["a"]=a;
	this["b"]=b;
	this["c"]=c;
	
	this["image"]
}
request.onsuccess=e=>{
	console.log(`IndexedDB打開成功`);
	db=e.target.result;
	db.onsucess=e=>{
		console.log(`資料庫操作成功`);
	};
	db.onerror=e=>{
		console.log(`資料庫操作失敗，\n錯誤碼：${e.target.errorCode}`);
	};
	let transaction=db.transaction(["os1"],"readwrite");
	let datas=[new data(1,"aa",111,true),new data(2,"bb",222,false),new data(3,"cc",333,true)];
	transaction.oncomplete=e=>{
		console.log(`事務完成！`)
	}
	transaction.onerror=e=>{
		console.log(`事務失敗：\n${e.target.errorCode}`);
	}
	transaction.onabort=e=>{
		console.log(`事務終止！`);
	}
	let objectStore1=transaction.objectStore("os1");
	datas.forEach((v,i)=>{
		let req=objectStore1.put(v);
		req.onsuccess=e=>{
			console.log(`插入成功：${e.target.result}`);
		};
	});
	let delreq=objectStore1.delete(2);
	delreq.onsuccess=e=>{console.log(`刪除成功！`)};
	let getreq=objectStore1.get(3);
	getreq.onsuccess=e=>{console.log(`獲取成功！\n${e.target.result.a}`);};
};
request.onerror=e=>{
	console.log(`IndexedDB打開失敗！\n錯誤碼：${e.target.errorCode}`);
};
request.onupgradeneeded=e=>{
	console.log(`版本更新...`);
	db=e.target.result;
	let objectStore=db.createObjectStore("os1",{keyPath: "id"});
};
function deletes(index)
{
	
}
*/
/*
// DisplayBox
        function display(message) {
            var displayBox = document.getElementById("displayBox");
            displayBox.innerHTML = message;
        }        

        // XMLHttpRequest
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {            
            console.log(JSON.parse(xhr.responseText));
        };

        try {
            xhr.open("get", "Setting/setting.json", true);
            xhr.send();
        }
        catch (ex) {
            display(ex.message);
        }        
*/