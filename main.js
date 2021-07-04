var STORAGE_KEY = 'todos-vuejs-demo'
var thingStorage = {
  fetch: function () {
    var things = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    things.forEach(function (thing, index) {
      thing.id = index
    })
    thingStorage.uid = things.length
    return things
  },
  save: function (things) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(things))
  }
}

Vue.component('delete-things',{
  template: '<button @click="deleteEvent">削除</button>',
  methods:{
    deleteEvent: function(){
      this.$emit('from-child')
    }
  }
})

var app = new Vue ({
    el: "#app",
    components: {
      'vuejs-datepicker':vuejsDatepicker,
    },
    data: {
        title: "",
        things: [],
        key: 0,
        options: [
          {value: -1, label: 'すべて'},
          {value: 0, label: '作業中'},
          {value: 1, label: '完了'}
        ],
        current: -1,
        DatePickerFormat: 'MM-dd'
    },
    methods: {
        add: function(){
            if(this.newthings == "")return;
            this.things.push({
                id: ++this.key,
                title: this.newthings,
                content: this.newcontent,
                deadline: this.newdeadline,
                state: 0
            });
            this.newthings = "";
            this.newcontent = "";
            this.newdeadline = "";
            this.saveList();
        },
        changeState: function(thing){
          thing.state = thing.state ? 0 : 1
        },
        deleteTodo: function(thing){
          if(this.things.length <= 0){
            return
          }else{
            result = confirm("本当に終わりましたか？");
            if(result) {
              var index = this.things.indexOf(thing)
              this.things.splice(index,1)
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
            month = hiduke.getMonth()+1;
            day = hiduke.getDate();
            return this.transfer_data =month + '/' + day ;
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
          computedTodos: function() {
            return this.things.filter(function(el) {
              return this.current < 0 ? true : this.current === el.state
            },this)
          }
    },
    watch: {
      things: {
        handler: function(things) {
          thingStorage.save(things)
        },
        deep: true
      }
    },
    created() {
      this.things = thingStorage.fetch()
    }
})