export default {
    api: {
        host: '',
        production: 'http://localhost/wp-json/wp/v2/',
        development: 'http://localhost/wp-json/wp/v2/'
    },
    disable_ssr: false,
    server:
    {
        http:
        {
            host: '127.0.0.1',
            port: 3000
        }
    },
    development:
    {
        webpack:
        {
            development_server:
            {
                host: '127.0.0.1',
                port: 3001
            }
        }
    }
};
