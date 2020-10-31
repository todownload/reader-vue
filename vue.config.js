module.exports = {
    devServer:{
        proxy:{
            '/reader':{
                // target: "127.0.0.1:8004",
                target:"http://47.112.241.187:8004",
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/reader':''
                }
            }
        },
    }
}