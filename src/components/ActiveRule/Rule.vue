<template>
    <div class="rule">
        <!-- <img src="../../assets/rule/hubei_01.jpg" alt=""> -->

        <img src="../../assets/rule/hubei_01.jpg" alt="">
        <img src="../../assets/rule/hubei_02.jpg" alt="">
        <img src="../../assets/rule/hubei_03.jpg" alt="">
        <img src="../../assets/rule/hubei_04.jpg" alt="">
        <img src="../../assets/rule/hubei_05.jpg" alt="">
        <img src="../../assets/rule/hubei_06.jpg" alt="">
        <img src="../../assets/rule/hubei_07.jpg" alt="">
        <img src="../../assets/rule/hubei_08.jpg" alt="">
        <img src="../../assets/rule/hubei_09.jpg" alt="">
        <img src="../../assets/rule/hubei_10.jpg" alt="">
        <img src="../../assets/rule/hubei_11.jpg" alt="">
        <img src="../../assets/rule/hubei_12.jpg" alt="">
        <img src="../../assets/rule/hubei_13.jpg" alt="">
        <img src="../../assets/rule/hubei_14.jpg" alt="">
        <img src="../../assets/rule/hubei_15.jpg" alt="">
        <img src="../../assets/rule/hubei_17.jpg" alt="">
        <img src="../../assets/rule/hubei_18.jpg" alt="" @click="callPhone(hddw)">
        <img src="../../assets/rule/hubei_19.jpg" alt="">
        <img src="../../assets/rule/hubei_20.jpg" alt="" @click="callPhone(hdzz)">
        <img src="../../assets/rule/hubei_21.jpg" alt="">
    </div>
</template>

<script>
        // var c=document.getElementById("canvas");
        // create
        // console.log(c);
        // var ctx=c.getContext("2d");
        // ctx.fillStyle="#FF0000";
        // ctx.fillRect(0,0,150,75);
    export default {
        data(){
            return {
                hddw:"020-82037895",//活动举办单位
                hdzz:"020-32365282",//活动赞助单位
            }
        },
        methods:{
            callPhone(num){

            }
        }
        
    }
</script>

<style scoped lang='less'>

.rule{
    width:100%;
    height:100%;
    box-sizing:border-box;
    .canvas{
        background: red;
        width:100px;
        height:100px;
        margin: 0 auto;
    }
    img{
        width:100%;
        display: block;
    }
}
</style>