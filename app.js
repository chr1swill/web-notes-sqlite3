//let db_p = wasm.allocPtr();
//let return_code = capi.sqlite3_open("myDb", db_p);
//if (return_code !== 0) {
//    throw new Error('Failed to open DB');
//};
//
//const db = wasm.getPtrValue(db_p);
//return_code = capi.sqlite3_exec(db, 'create table fruits(id integer primary key autoincrement, name text);', null, null, null);
//if (return_code !== 0) {
//    throw new Error('Failed to create fruit table');
//};
//console.log("Created fruits Table");
//
//const start_insert = Date.now();
//console.log("Starting Inserting data into fruits Table");
//for (let i = 0; i < fruits.length; i++) {
//    return_code = capi.sqlite3_exec(db, `insert into fruits(name) values ('${fruits[i]}');`, null, null, null);
//    if (return_code !== 0) {
//        throw new Error(`Failed to insert ${fruits[i]} into fruit table`);
//    };
//    console.log(`Sucessfully insert into table fruits(name) values (${fruits[i]});`);
//};
//const complete_insert = Date.now();
//const insert_diff = (complete_insert - start_insert);
//console.log("Completed inserting all values into sqlite3 in: ", insert_diff, "ms");
//
//console.log("Starting select statement for all the data");
//const start_select = Date.now();
//const statement_p = wasm.allocPtr();
//return_code = capi.sqlite3_prepare_v2(db, 'select * from fruits', -1, statement_p, null); 
//if (return_code !== 0) {
//    throw new Error("Failed to select all the data from the fruits table");
//};
//const statement_v = wasm.getPtrValue(statement_p);
//
//const complete_select = Date.now();
//const select_diff = (complete_select - start_select);
//console.log("Competed select statement for all values in sqlite3 in: ", select_diff, "ms");
//
//const p = document.createElement('p');
//const line_break = p.cloneNode(true);
//line_break.textContent = '------------------------------------------------';
//console.log("Starting select + dom render");
//console.log("return code of step: ", capi.sqlite3_step(statement_v));
//const start_total_select_render = Date.now();
//while ((return_code = capi.sqlite3_step(statement_v)) === 100) {
//    console.log("******************");
//    const start_render_to_dom_time = Date.now();
//    const id = capi.sqlite3_column_int(statement_v, 0);
//    const name = capi.sqlite3_column_text(statement_v, 1);
//    const nameLength = capi.sqlite3_column_bytes(statement_v, 1);
//    const node = p.cloneNode(true);
//    node.textContent = `Row number: ${id}, name: ${name}, length: ${nameLength}`;
//    document.body.appendChild(node);
//    document.body.appendChild(line_break.cloneNode(true));
//    const complete_render_to_dom_time = Date.now();
//    const diff = (complete_render_to_dom_time - start_render_to_dom_time);
//    console.log("Rendered single row in", diff, "ms");
//};
//const complete_total_select_render = Date.now();
//const diff_select_render = (complete_total_select_render - start_total_select_render);
//console.log("Renderd a total of ", fruits.length, " element to dom in: ", diff_select_render, "ms");
//
//capi.sqlite3_finalize(statement_v);
//wasm.dealloc(statement_p);
//capi.sqlite3_free(db);
//wasm.dealloc(db_p);

const worker = new Worker("/worker.js", { type: "module" });
worker.postMessage(1)
