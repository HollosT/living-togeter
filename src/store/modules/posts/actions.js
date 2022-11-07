import { onErrorCaptured } from "vue"

export default {
    async generatePost(context, payload) {

        const newPost = {
            userId: payload.userId,
            email: payload.email,
            post: payload.post,
            date: payload.date,
            firstName: payload.firstName,
            lastName: payload.lastName,
            buildingId: payload.buildingId,
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
                    likes: path.likes ? path.likes : [],
                    buildingId: path.buildingId
                }
                
                posts.push(postWannabe)
            }
        }
        context.commit('addPosts', posts)
    },


    async like(_, payload) {
        try{
            console.log(payload);
            // Checking whether the user already applied
            const post = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`)
            
            const postResponse = await post.json()

            
            if(postResponse.likes && postResponse.likes.length > 0 && postResponse.likes.includes(payload.curUser) ) {
               const error = new Error( 'You already liked this post.')
               throw error
            } else {
                const newLikes = payload.likes
                newLikes.push(payload.curUser)
    
                const likeWannabe = {
                    ...payload,
                    likes: newLikes
                }
    
    
                const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(likeWannabe)
                })
    
                if(!response.ok) {
                    const error = new Error(response.message || 'Failed to send request.')
                    throw error
                }
                
                const responseData = await response.json()

            }
            
       
        } catch(err) {
            console.log(err);
        }
    },


    async interactionWithThePost(_, payload) {
        try{
            let interaction = payload.interaction

            // Checking whether the user already applied
            const post = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`)
            
            const postResponse = await post.json()

            
            if(postResponse.interaction && postResponse.interaction.length > 0 && postResponse.interaction.includes(payload.curUser) ) {
               const error = new Error( `You already ${interaction}d this post!`)
               throw error
            } else {

                switch(interaction) {
                    case 'likes': //.....
                    break;

                    case 'dislikes': //...
                    break;

                    
                }

                const newInteraction = payload.likes
                newLikes.push(payload.curUser)
    
                const likeWannabe = {
                    ...payload,
                    likes: newLikes
                }
    
    
                const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(likeWannabe)
                })
    
                if(!response.ok) {
                    const error = new Error(response.message || 'Failed to send request.')
                    throw error
                }
                
                const responseData = await response.json()

            }
            
       
        } catch(err) {
            console.log(err);
        }
    }
}
}

