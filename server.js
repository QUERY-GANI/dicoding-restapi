const http = require('http');
const PORT = 3000;
const HOST = "localhost";     
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
    const { method, url } = request;

    if(method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }
    if(method === 'POST') {
        let body = [];
        request.on("data", (chunk) => {
            body.push(chunk)
        })
        request.on("end", () => {
            body = Buffer.concat(body).toString()
            const { name } = JSON.parse(body);
            response.end(`<h1>Hai, ${name}!</h1>`);
        })
    }
};
 
const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
})