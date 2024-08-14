import { sqlite3InitModule } from "./sqlite3.js";
const sqlite3 = await sqlite3InitModule();
const { capi, wasm } = sqlite3.sqlite3
