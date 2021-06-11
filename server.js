const http = require('http');
const PORT = 5000;
const HOST = "localhost";     

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('X-Powered-By', 'NodeJS');
    const { method, url } = request;
    if(url === '/') {
        // TODO 2: logika respons bila url bernilai '/'
        if (method === "GET") {
            response.statusCode = 200;
            response.end("<h1>Ini adalah homepage</h1>")
        } else {
            response.statusCode = 404;
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`)
        }
    } else if(url === "/about") {
        // TODO 3: logika respons bila url bernilai '/about'
        if (method === "GET") {
            response.statusCode = 200;
            response.end("<h1>Halo! Ini adalah halaman about</h1>")
        } else if (method === "POST") {
            response.statusCode = 200;
            const body = [];
            request.on("data", (chunk) => body.push(chunk))
            request.on("end", () => {
                const { name } = JSON.parse(Buffer.concat(body).toString());
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`)
            })
        } else {
            response.statusCode = 404;
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`)
        }
    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.statusCode = 404;
        response.end("<h1>Halaman tidak ditemukan!</h1>")
    }
};
 
const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
})