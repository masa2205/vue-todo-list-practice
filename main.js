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
    },
    methods: {
        add: function(){
            if(this.newthings == "")return;
            this.things.push({
                id: ++this.key,
                title: this.newthings,
                // isChecked: false,
            });
            this.newthings = "";
            this.saveList();
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
    }
 })