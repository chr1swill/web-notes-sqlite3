import { sqlite3InitModule } from "./sqlite3.js";
const sqlite3 = await sqlite3InitModule();
const { capi, wasm } = sqlite3.sqlite3

// ok so i dont have the have ofps so then how can i do some store of db saving without it, using like index db or somthing;
self.onmessage = function() {
    if (capi.sqlite3_vfs_find("opfs")) {
        console.log("opfs works here");
    } else {
        console.log("opfs not avaliable");
    };

    if(sqlite3.sqlite3.oo1.OpfsDb){
        console.log("this oo shit works");
    } else {
        console.log("even this oo shit is not working");
    };
};
