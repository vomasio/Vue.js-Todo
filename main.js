// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
const app = new Vue({
    el: '#app',
    data: {
        // use data
        todos: []
    },
    methods: {
        //use method
        doAdd: function(event, value) {
            //element that named (ref)
            var comment = this.$refs.comment
            //when no input
            if(!comment.value.length) {
                return
            }
            //{newID,comment,status} push for todos
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value = ''
        }
    },
    // "watch" for auto save
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    }
    created() {
        this.todos = todoStorage.fetch()
    }
})