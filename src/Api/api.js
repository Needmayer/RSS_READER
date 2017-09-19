

export function getAllData(userInfo, callback) {

    const {username, filter} = userInfo;
    console.log(userInfo);

    if (!username || username === "#") {
        return {};
    }
    fetch('/api/rss', {
        method: 'POST',
        body: JSON.stringify({ username, filter }),
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

export async function getLoggedUserData(callback){

    let data = await (
        await fetch('api/loggedUser', {
            method: 'GET',
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        })).json();
    return data;
}
