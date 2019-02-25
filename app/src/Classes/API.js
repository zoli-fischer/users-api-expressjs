export default class API {
    constructor(apiEndpoint, authToken) {
        this.apiEndpoint = apiEndpoint;
        this.authToken = authToken;
    }

    auth(email, password) {
        return this.fetch('/auth', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        });
    }

    /**
     * Fetch data from API endpoint
     * Endpoint: /authenticate/userpasshmac
     * @param {*} path string
     * @param {*} options object
     * @returns promise
     */
    fetch(path, options) {
        const optionsAssigned = Object.assign({
            cache: 'no-cache',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authToken}`,
            },
        }, options);
        return fetch(this.apiEndpoint + path, optionsAssigned)
            .then(response => response.json())
            .then((response) => {
                if (response.status === 200) {
                    return Promise.resolve(response);
                }
                return Promise.reject(response);
            });
    }
}
