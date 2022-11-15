<template>
    <li>
        <div class="name-date-container">
            <p data-paragraph="small">{{comment.firstName}} {{comment.lastName}}</p>
            <time>{{comment.commentDisplayedDate}}</time>
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

li {
    background: white;
    border-radius: 5px;
    padding: 2%;
    border-left: 5px solid var(--lightgreen);
    margin-bottom: .5vw;
}
.name-date-container {
    padding-bottom: .5vw;
    border-bottom: 1px solid var(--primarly);
    display: flex;
    justify-content: space-between;
    margin-bottom: .5vw;
    
}

</style>