import endpoints from "./endpoints";
import checAuth from "./checkAuth";
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

    logout = async (token) => {
        try {
            let res = await fetch(endpoints.logout, {
                method: 'POST',
                body: JSON.stringify({
                    UserToken: token
                }),
            }) 
            const r = await checAuth(res);
            return r?.text()
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