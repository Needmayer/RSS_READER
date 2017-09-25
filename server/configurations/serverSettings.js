export function getMongoConnection(){
    if(process.env.NODE_ENV !== 'production'){
        return 'mongodb://Needmayer:o4Lh7jJP@ds119508.mlab.com:19508/needdb';
    }else {
        return 'mongodb://localhost:3000/rss_reader';
    }
}

export function getCookieSecure(){
    return 'ULTRA_HEAVY_COOKIE_SECURE-key';
}
