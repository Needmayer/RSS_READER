

export function getAllData(callback){

    fetch("/api/rss")
    .then((resp) => resp.json())
    .then(function(data){
        if (data instanceof Array) {    
            console.log("api data", data);
            callback(data);          
            return;  
        }
        return Promise.reject(Error('error'));
    }).catch(error => {
        return Promise.reject(Error(error.message));
    });

}
