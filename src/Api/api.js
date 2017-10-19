
export async function getAllData(userInfo) {
    const { username, filter } = userInfo;

    if (!username || username === "#") {
        return {};
    }
    let data = await (
        await fetch('/api/rss', {
            method: 'POST',
            body: JSON.stringify({ username, filter }),
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        })).json();
    let check = Object.keys(data).length !== 0 ? data : false;
    return check;
}

export async function getLoggedUserData() {

    let data = await (
        await fetch('api/loggedUser', {
            method: 'GET',
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        })).json();
    return data;
}
