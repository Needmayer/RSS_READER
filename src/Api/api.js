

export function getAllData(username, callback){
    console.log(username);
    
    if(!username || username === "#"){
        return {};
    }
    console.log(username);
    fetch('/api/rss', {
        method: 'POST',
        body: JSON.stringify({username}),
        headers: new Headers({ "Content-Type": "application/json" })
    })
    .then(resp => {
        return resp.json();
    })
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
