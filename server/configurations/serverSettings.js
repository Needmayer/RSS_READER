export function getMongoConnection(){
    if(process.env.NODE_ENV === 'production'){
        return 'mongodb://Needmayer:o4Lh7jJP@ds119508.mlab.com:19508/needdb';
    }else {
        return 'mongodb://localhost:27017/rss_reader';
    }
}

export function getCookieSecret(){
    return 'ULTRA_HEAVY_COOKIE_SECURE-key';
}
