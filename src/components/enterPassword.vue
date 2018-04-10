<template>
    <div>
        <ul class="passWordList">
            <li>●</li>
            <li>●</li>
            <li>●</li>
            <li>●</li>
            <li>●</li>
            <li>●</li>
        </ul>
        <span v-text="this.password"></span>
        <ul class="numList">
            <li @click="pushNum(1)">1</li>
            <li @click="pushNum(2)">2</li>
            <li @click="pushNum(3)">3</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            password:''
        }
    },
    methods:{
        pushNum(num){
            this.password += num
        }
    }
}
</script>

<style lang="less" scoped>

</style>