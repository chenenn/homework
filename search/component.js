Vue.component("search",{
    template:`<div class="search"><input type="text" v-model="title" @focus="changeState"></div>`,
    props:["title"],
    methods:{
        changeState(){
            this.$emit('changes');
        }
    }
})
Vue.component("comment",{
    template:`<div class="comment">
            <ul v-show="state">
                <li v-for="item in datas" @click="writeT(item)">{{item}}</li>
            </ul>
        </div>`,
    props:["datas","state"],
    methods:{
        writeT(item){
            this.$emit("tt",item);
        }
    }
})