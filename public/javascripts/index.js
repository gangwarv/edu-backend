function post(query, token) {
    const url = "/graphql";
    if (!query) {
        query = {
            query: `
                query {
                    books {
                        _id
                        title
                        price
                    }
                }
                `
        }
    }
    else {
        query = {
            query
        }
    }
    return fetch(url,
        {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : "Bearer "+ token
            },
            body: JSON.stringify(query)
        }
    ).then(res => res.json())
}

function get(url = "/api/auth.json") {
    return fetch(url).then(res => res.json())
}