//import { sqlite3InitModule } from "./sqlite3.js";
//const sqlite3 = await sqlite3InitModule();
//const { capi, wasm } = sqlite3.sqlite3

let pDB = wasm.allocPtr();
let rc = capi.sqlite3_open("myDB", pDB);
if (rc !== 0) {
    throw new Error(`Failed to open the database ${rc}`);
};
let db = wasm.getPtrValue(pDB);

rc = capi.sqlite3_exec(db, "create table fruits(id int, name text);", null, null, null);
if (rc !== 0) {
    throw new Error(`Failed to create table: ${rc}`);
};

rc = capi.sqlite3_exec(db, "insert into fruits (id, name) values (0, 'watermelon'), (1, 'apple'), (2, 'pear'), (3, 'grape');", null, null, null);
if (rc !== 0) {
    throw new Error(`Failed to insert data: ${rc}`);
};

// Prepare the SELECT statement
const sql = "SELECT * FROM fruits;";
const statement_p = wasm.allocPtr();
rc = capi.sqlite3_prepare_v2(db, sql, -1, statement_p, null);
if (rc !== 0) {
    throw new Error(`Failed to prepare statement: ${rc}`);
};
const statement_v = wasm.getPtrValue(statement_p);

const pEle = document.createElement('p');
const br = document.createElement('br');

// Execute the statement and fetch results
while ((rc = capi.sqlite3_step(statement_v)) === 100) {
    const id = capi.sqlite3_column_int(statement_v, 0);
    const namePtr = capi.sqlite3_column_text(statement_v, 1);
    const nameLength = capi.sqlite3_column_bytes(statement_v, 1);
    const node = pEle.cloneNode(true);
    node.textContent = `Row: id = ${id}, name = ${namePtr}, nameLength = ${nameLength}`;
    document.body.appendChild(node);
    document.body.appendChild(br.cloneNode(true));
    console.log(`Row: id = ${id}, name = ${namePtr}, nameLength = ${nameLength}`);
    console.log('---------------------------------------------------------');
};
if (rc !== 101) {
    throw new Error(`Error executing statement: ${rc}`);
};

// Clean up
capi.sqlite3_finalize(statement_v);
capi.sqlite3_free(db);
wasm.dealloc(pDB);
wasm.dealloc(statement_p);
