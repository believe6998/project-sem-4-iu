function buildGet(client) {
    return async (url, data) => {
        try {
            const response = await client.get(url, data)

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error
        }
    }
}

function buildPost(client) {
    return async (url, data) => {
        try {
            const config = {
                headers: {
                    'x-access-token' : localStorage.getItem('user-token'),
                    'Access-Control-Allow-Headers': 'x-access-token',
                    'Content-Type': 'application/json'
                }
            };
            const response = await client.post(url, data, config)

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error
        }
    }
}

function buildPut(client) {
    return async (url, data, config) => {
        try {
            const response = await client.put(url, data, config)

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error
        }
    }
}

function buildDel(client) {
    return async (url) => {
        try {
            const response = client.delete(url)

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error
        }
    }
}

export default function(client) {
    return {
        get: buildGet(client),
        post: buildPost(client),
        put: buildPut(client),
        del: buildDel(client)
    }
}
