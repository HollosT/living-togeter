export default {
    async generatePost(context, payload) {

        const newPost = {
            userId: payload.userId,
            email: payload.email,
            post: payload.post,
            date: payload.date,
            firstName: payload.firstName,
            lastName: payload.lastName,
            likes: []
        }

        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}.json`, {
            method: 'POST',
            body: JSON.stringify(newPost)
        })

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.')
            throw error
        }

        const responseData = await response.json()

        context.commit('addPost', newPost)
    },


    async loadPosts(context, payload) {
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload}.json`)

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.')
            throw error
        }

        let posts = []

        const responseData = await response.json()
        for(const key in responseData) {
            for(const innerKey in responseData[key]) {
                const path = responseData[key][innerKey]
                const postWannabe = {
                    postId: innerKey,
                    userId: path.userId,
                    email: path.email,
                    post: path.post,
                    date: path.date,
                    firstName: path.firstName,
                    lastName: path.lastName,
                    likes: path.likes ? path.likes : []
                }
                
                posts.push(postWannabe)
            }
        }
        context.commit('addPosts', posts)
    },


    async like(_, payload) {
        try{
            

            const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            })

            if(!response.ok) {
                const error = new Error(response.message || 'Failed to send request.')
                throw error
            }
            
        const responseData = await response.json()
            console.log(responseData);

        } catch(err) {

        }
    }
}