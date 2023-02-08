import endpoints from "./endpoints";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}


class apiService {
    
    auth = async (body) => {
        try {
            let res = await fetch(endpoints.auth, {
                method: 'POST',
                body:JSON.stringify(body),
                // headers
            })

            return await res.text();
        } catch(err) {
            console.log(err)
        }
    }

    getTransctions = async (token) => {
        try {
            let res = await fetch(endpoints.getTransactions, {
                method: 'POST',
                body: JSON.stringify({
                    UserToken: token
                })
            })

            return await res.json();
        } catch(err) {
            console.log(err)
        }
    }
}

export default apiService;