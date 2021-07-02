// var STORAGE_KEY = 'todos-vuejs-demo'
// var thingStorage = {
//   fetch: function () {
//     var things = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
//     things.forEach(function (thing, index) {
//       thing.id = index
//     })
//     thingStorage.uid = things.length
//     return things
//   },
//   save: function (things) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(things))
//   }
// }


var app = new Vue ({
    el: "#app",
    data: {
        title: "",
        things: [],
        key: 0,
        options: [
          {value: -1, label: 'すべて'},
          {value: 0, label: '作業中'},
          {value: 1, label: '完了'}
        ]
    },
    methods: {
        add: function(){
            if(this.newthings == "")return;
            this.things.push({
                id: ++this.key,
                title: this.newthings,
                state: 0
                // isChecked: false,
            });
            this.newthings = "";
            this.saveList();
        },
        changeState: function(thing){
          thing.state = thing.state ? 0 : 1
        },
        deleteTodo: function(){
          if(this.things.length <= 0){
            return
          }else{
            result = confirm("本当に終わりましたか？");
            if(result) {
               this.things = this.things.filter(function(thing){
                   return thing.isChecked === false;
               }),
               alert("お疲れ様でした!")
            }else{
 
            };
            this.saveList();
          }
        },
        saveList: function(){
         localStorage.setItem('things', JSON.stringify(this.things));
        },
        loadList: function(){
            this.things=JSON.parse(localStorage.getItem('things'));
            if(!this.things){
                this.things=[];
            }
        },
        mounted: function(){
            this.loadList();
        }
    },
    computed: {
         setDate: function() {
            hiduke = new Date();
            year = hiduke.getFullYear();
            month = hiduke.getMonth()+1;
            day = hiduke.getDate();
            return this.transfer_data = year + '/' + month + '/' + day ;
         },
         remaining: function() {
             return this.things.filter(function(thing) {
                 return thing.isChecked == true;
             }).length;
         },
         labels() {
           return this.options.reduce(function (a, b){
             return Object.assign(a, {[b.value]: b.label})
           }, {})
         },
    }
 })