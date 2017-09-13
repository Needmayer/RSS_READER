

export function getAllData(username, callback) {

    if (!username || username === "#") {
        return {};
    }
    fetch('/api/rss', {
        method: 'POST',
        body: JSON.stringify({ username }),
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
