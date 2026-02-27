//export const APIURL = "http://localhost:5001/";
export const APIURL = "https://ps007-bankend-1.onrender.com/";
export const IMGURL = "/";

export function callApi(rmethod, url, data, responseHandler) {
    let options = (rmethod === "GET" || rmethod === "DELETE") ? { method: rmethod, headers: { 'Content-Type': 'application/json' } } : { method: rmethod, headers: { 'Content-Type': 'application/json' }, body: data };
    fetch(url, options)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.status + ": " + response.statusText);
            return response.json();
        })
        .then((res) => responseHandler(res))
        .catch((err) => alert(err.message));
}