export default {
    getPosts(state, getters) {
        const posts = state.allPosts
        
        // // Cheking whether it has been like by the current user
        // posts.forEach((post, i) => {
        //     const {liked, disliked} = getters['isInteracted']
        //     posts[i].liked = liked;
        //     posts[i].disliked = disliked;

        // })


        // Adjusting the post date
        const oneDayMs = 86400000
        const now = new Date().getTime();

        const postDateArr = posts.map(post => post.date)
        let updatedDate;


        postDateArr.forEach((date, i) => {
            const difference = now - date
            
            if((difference / oneDayMs) < 1) {
                const generatedDate = new Date(date).toLocaleString('eu-dk').split(',')[1].slice(1, 6)

                updatedDate = `Today at ${generatedDate}`

            } else if  ((difference / oneDayMs) > 1 && (difference / oneDayMs) < 2) {
                updatedDate = '1 day ago'

            } else if  ((difference / oneDayMs) > 2 && (difference / oneDayMs) < 3) {
                updatedDate = '2 days ago'

            } else if ((difference / oneDayMs) > 3) {
                updatedDate = 'More than 3 days ago...'
                
            }

            posts[i].displayDate = updatedDate
            
        })


        // Adjusting the comments date
        let commentDateArr = []
        let updatedCommentDate
         posts.forEach((post, i) => {
                const postCommentArr = post.comments.map(comment => comment.commentDate)
                commentDateArr.push(postCommentArr)
         })

       

        commentDateArr.forEach((commentArr, postIndex) => {

            commentArr.forEach((comment, commentIndex) => {
                const date = comment
            
                const difference = now - date
                
                if((difference / oneDayMs) < 1) {
                    const generatedDate = new Date(date).toLocaleString('eu-dk').split(',')[1].slice(1, 6)
    
                    updatedCommentDate = `Today at ${generatedDate}`
    
                } else if  ((difference / oneDayMs) > 1 && (difference / oneDayMs) < 2) {
                    updatedCommentDate = '1 day ago'
    
                } else if  ((difference / oneDayMs) > 2 && (difference / oneDayMs) < 3) {
                    updatedCommentDate = '2 days ago'
    
                } else if ((difference / oneDayMs) > 3) {
                    updatedCommentDate = 'More than 3 days ago...'
                    
                }

                posts[postIndex].comments[commentIndex].commentDisplayedDate = updatedCommentDate
            })

           

            
        })

        const ascendingPosts = posts.sort((a, b) => b.date - a.date)

        return ascendingPosts
    },



    isInteracted(state, _, _2, rootGetters) {
        const posts = state.allPosts
        const userId = rootGetters.userId
        const interactionArray = ['likes', 'dislikes'];
        let isLiked = false;
        let isDisliked = false;

       interactionArray.forEach(int => {
            
            

            switch(int) {
                case('likes'): 
                    posts.map(post => {
                        if(post.likes.includes(userId)) {
                            isLiked = true
                        }
                    })
                break;

                case('dislikes'): 
                    posts.map(post => {
                        if(post.dislikes.includes(userId)) {
                            isDisliked = true
                        }
                    })
                break;
            }
        
                
            
       })

       const isInteracted ={
        liked: isLiked,
        disliked: isDisliked
       }

        return isInteracted

    }
   
}