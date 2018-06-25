<template>
    <div class="share pr">
        <img src="../../../assets/me/share.jpg" alt="拉票海报" class="poster_bg">
        <img src="" alt="" class="avator pa">
        <img src="" alt="" class="qrcode pa">
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.share{
    height:100vh;
    width:100vw;
    overflow:hidden;
    background: red;
    .poster_bg{
        width:100%;
        height:100%;
    }
    .avator{
        width: 95px;
        height: 95px;
        box-sizing: border-box;
        border: 1px solid red;
        top: 76px;
        left: 50%;
        border-radius: 100%;
        background: green;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);

    }
     .qrcode{
            width: 95px;
            width: 80px;
            height: 80px;
            bottom: 103px;
            left: 39%;
            background: blue;
            transform: translate(-50%, 0);
    /* transform: translate(-50%, 0); */

    }

}

</style>