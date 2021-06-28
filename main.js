//ストレージ周りの実装　公式サンプルから持ってきている
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
    //el: '#Vueが作用する範囲のdivのid'
    // 参考　https://jsstudy.hatenablog.com/entry/What-is-el-in-Vuejs
    el: '#app',
    data: {
        // use data　変数宣言部？
        todos: [],
        options: [
            {value: -1, label: 'All'},
            {value: 0, label: 'Do'},
            {value: 1, label: 'Complete'}
        ],
        current: -1
    },
    //methods クリックされたとかのイベントで発火するやつ
    //参考　https://shimablogs.com/vuejs-computed-methods
    methods: {
        //use method　関数
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
            //splice 配列の関数。データの置換や削除ができる。
            //参考　https://ti-tomo-knowledge.hatenablog.com/entry/2018/07/10/110003
            this.todos.splice(index, 1);
        }
    },
    // "watch" for auto save　オブジェクトが追加されたり削除されたりするのを監視
    //参考　https://qiita.com/_Keitaro_/items/8e3f8448d1a0fe281648
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },
    //computed 値の変更時（フォーム入力等）に実行されるやつ
    //参考　https://qiita.com/kaorina/items/bb261a119b9f02e02c2d
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