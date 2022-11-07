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
            likes: [],
            dislikes: [],
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
                    dislikes: path.dislikes ? path.dislikes : [],
                    buildingId: path.buildingId
                }
                
                posts.push(postWannabe)
            }
        }
        context.commit('addPosts', posts)
    },




    async interactionWithThePost(_, payload) {
        try{
            let interactionType = payload.mode
            
            // Checking whether the user already applied
            const post = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`)
            
            const postResponse = await post.json()

            let newInteraction;

            if(postResponse[interactionType] && postResponse[interactionType].length > 0 && postResponse[interactionType].includes(payload.curUser) ) {
               const error = new Error( `You already ${interactionType}d this post!`)
               throw error
            } else {

                switch(interactionType) {
                    case 'likes':
                        newInteraction = payload.likes
                        
                    break;

                    case 'dislikes': 
                        newInteraction = payload.dislikes
                  
                    break;

                    case 'comments': 
                    break;     
                }

                
                newInteraction.push(payload.curUser)


    
                const interactionWannabe = {
                    userId: payload.userId,
                    email: payload.email,
                    post: payload.post,
                    date: payload.date,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    buildingId: payload.buildingId,
                    likes: interactionType === 'likes' ? newInteraction : payload.likes,
                    dislikes: interactionType === 'dilikes' ? newInteraction : payload.dislikes,
                }
    
    
                const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/posts/${payload.buildingId}/${payload.userId}/${payload.postId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(interactionWannabe)
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


