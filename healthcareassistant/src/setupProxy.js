const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/firebase',
        createProxyMiddleware({
            target: 'https://firestore.googleapis.com',
            changeOrigin: true,
            pathRewrite: {
                '^/firebase': '',
            },
        })
    );
};
