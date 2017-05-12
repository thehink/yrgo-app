export default {
    api: {
        host: ''
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
