import * as http from 'node:http';
import * as fs from 'node:fs'

const server = http.createServer(
    function(req, res) {
        if (req.url === '/sqlite3.wasm') {
            const sqlite_wasm = fs.readFileSync('./sqlite3.wasm');
            res.setHeader('Content-Type', 'application/wasm');
            res.statusCode = 200;
            res.end(sqlite_wasm);
            return;
        };

        if (req.url === '/index.js') {
            const index_js = fs.readFileSync('./index.js');
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            res.end(index_js);
            return;
        };

        if (req.url === '/fruits.js') {
            const fruits_js = fs.readFileSync('./fruits.js');
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            res.end(fruits_js);
            return;
        };

        if (req.url === '/indexedDB.js') {
            const indexedDB_js = fs.readFileSync('./indexedDB.js');
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            res.end(indexedDB_js);
            return;
        };

        if (req.url === '/sqlite3.js') {
            const sqlite3_js = fs.readFileSync('./sqlite3.js');
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            res.end(sqlite3_js);
            return;
        };

        if (req.url === '/worker.js') {
            const worker_js = fs.readFileSync('./worker.js');
            res.setHeader('Content-Type', 'application/javascript');
            res.statusCode = 200;
            res.end(worker_js);
            return;
        };

        if (req.url === '/') {
            const homepage = fs.readFileSync('./index.html');
            res.setHeader("Content-Type", 'text/html');
            res.statusCode = 200;
            res.end(homepage.toString());
            return;
        };

        res.setHeader("Content-Type", 'text/plain');
        res.statusCode = 404;
        res.end("404 Not Found");
        return;
    }
); 

server.listen(8080, () => console.log("Server runing on port 8080"))
