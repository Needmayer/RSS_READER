
/*
export function getAllData(userInfo, callback) {

    
    fetch('/api/rss', {
        method: 'POST',        
        body: JSON.stringify({ username, filter }),
        credentials: "include",        
        headers: new Headers({ "Content-Type": "application/json" })
    })
        .then(resp => {
            return resp.json();
        })
        .then(function (data) {
            if (data instanceof Array) {
                callback(data);
                return;
            }
            return Promise.reject(Error('error'));
        }).catch(error => {
            return Promise.reject(Error(error.message));
        });

}
*/
export async function getAllData(userInfo) {
    const { username, filter } = userInfo;

    if (!username || username === "#") {
        return {};
    }
    const data = await (
        await fetch('/api/rss', {
            method: 'POST',
            body: JSON.stringify({ username, filter }),            
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        })).json();
    console.log("data api", data);
    return data;
}

export async function getLoggedUserData(callback) {

    let data = await (
        await fetch('api/loggedUser', {
            method: 'GET',
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        })).json();
    return data;
}
