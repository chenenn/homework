let app = new Vue({
    el:"#app",
    data:{
        datas:[11111,222222,333333],
        state:false,
        title:''
    },
    methods:{
        change(){
            this.state = true;
        },
        changeTitle(item){
            this.title = item;
            this.state = false;
        }
    }
})