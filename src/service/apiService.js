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

    getTransctions = async (token, body) => {
        try {
            let res = await fetch(endpoints.getTransactions, {
                method: 'POST',
                body: JSON.stringify({
                    UserToken: token,
                    ...body
                })
            })

            const r = await checAuth(res);
            return r?.json();

        } catch(err) {
            console.log(err)
        }
    }

    getTransactionUserInfo = async (token, body) => {
        try {
            let res = await fetch(endpoints.getTransactionUserInfo, {
                method: 'POST',
                body: JSON.stringify({
                    UserToken: token,
                    ...body
                })
            })

            const r = await checAuth(res);
            return r?.json();

        } catch(err) {
            console.log(err)
        }
    }

    acceptTrans = async (token, body) => {
        try {
            let res = await fetch(endpoints.acceptTrans, {
                method: 'POST',
                body:JSON.stringify({
                    UserToken: token,
                    ...body
                })
            })

            const r = await checAuth(res);
            return r?.text();

        } catch(err) {
            console.log(err)
        }
    }

    takeTrans = async (token, body) => {
        try {
            let res = await fetch(endpoints.takeTrans, {
                method: 'POST',
                body:JSON.stringify({
                    UserToken: token,
                    ...body
                })
            })

            const r = await checAuth(res);
            return r?.text();
        } catch(err) {
            console.log(err)
        }
    }

    rejectTrans = async (token, body) => {
        try {
            let res = await fetch(endpoints.rejectTrans, {
                method: 'POST',
                body: JSON.stringify({
                    UserToken: token,
                    ...body
                })
            })

            const r = await checAuth(res);
            return r?.text();
        } catch(err) {
            console.log(err)
        }
    }
}

export default apiService;