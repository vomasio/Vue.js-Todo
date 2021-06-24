// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo';
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};
const app = new Vue({
    el: '#app',
    data: {
        // use data
        todos: [],
        options: [
            {value: -1, label: 'All'},
            {value: 0, label: 'Do'},
            {value: 1, label: 'Complete'}
        ],
        current: -1
    },
    methods: {
        //use method
        doAdd: function(event, value) {
            //element that named (ref)
            var comment = this.$refs.comment;
            //when no input
            if(!comment.value.length) {
                return;
            }
            //{newID,comment,status} push for todos
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            });
            comment.value = '';
        },
        //Change State
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1;
        },
        //Delete
        doRemove: function(item) {
            var index = this.todos.indexOf(item);
            this.todos.splice(index, 1);
        }
    },
    // "watch" for auto save
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },
    computed: {
        computedTodos: function() {
            return this.todos.filter(function(el) {
                return this.current <0 ? true : this.current === el.state;
            }, this);
        },
        labels() {
            return this.options.reduce(function(a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
        }
        
    },
    created() {
        this.todos = todoStorage.fetch();
    }
});