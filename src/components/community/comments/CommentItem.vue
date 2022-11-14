<template>
    <li>
        <div class="name-date-container">
            <p>{{comment.firstName}} {{comment.lastName}}</p>
            <p>{{comment.commentDate[1]}} - {{comment.commentDate[0]}}</p>
        </div>
        <div> 
            <p>{{comment.body}}</p>
            <div class="comment-date">
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['comment']

}
</script>

<style scoped>
.name-date-container {
    display: flex;
    
}

</style>