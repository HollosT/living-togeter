<template>
    <li>
        <div class="name-container">
            <p>{{comment.firstName}} {{comment.lastName}}</p>
        </div>
        <div> 
            <p>{{comment.body}}</p>
            <div class="comment-date">
                <p>{{comment.commentDate[1]}} - {{comment.commentDate[0]}}</p>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['comment']

}
</script>

<style>

</style>