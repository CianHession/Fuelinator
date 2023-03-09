const path = require('path');

module.exports = {
    // your other webpack configuration options here
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser")
        }
    }
};
