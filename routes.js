const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
           const { name = "stranger" } = request.params;
           const { lang } = request.query;
           if(lang === 'id') {
            return `Hai, ${name}!`;
           }
           return `Hello, ${name}!`;
       },
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username } = request.payload;
            return `Welcome ${username}!`;
        },
    },
    {
        method: 'GET',
        path: '/register',
        handler: (request, h) => {
            const response = h.response('success');
            response.type('text/plain');
            response.header('X-Custom', 'some-value');
            return response;

            // Chained notation
            // return h.response('success')
            //         .type('text/plain')
            //         .header('X-Custom', 'some-value');
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];
 
module.exports = routes;