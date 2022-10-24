
export default {

    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })

    },

    async auth(context, payload) {
        console.log(payload);
        const mode = payload.mode;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFdJX12HXkQTuFCPN11sgU-vO-flAkYGY`

        if(mode === 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFdJX12HXkQTuFCPN11sgU-vO-flAkYGY`
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await response.json()

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate! Check your credentials!')
            throw error
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },

    logout(context) {

        context.commit('setUser', {
            userId: null,
            token: null,
        })
    }

}