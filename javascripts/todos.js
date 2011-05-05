// Todo
this.Todo = Backbone.Model.extend({

  toggle: function() {
    this.save({done: !this.get("done")});
    this.collection.trigger("change:done")
  }
  
});

// Todo List
this.TodoList = Backbone.Collection.extend({

  model: Todo,
  localStorage: new Store("todos"),

  // Returns all done todos.
  done: function() {
    return this.filter(function(todo){
      return todo.get('done');
    });
  },

  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },

  comparator: function(todo) {
    return todo.get('order');
  },

  pluralize: function(count) {
    return count == 1 ? 'item' : 'items';
  }

});

this.Todos = new TodoList;

this.TodoView = Backbone.View.extend({

  tagName: "li",
  className: "todo",
  
  events: {
    "click .todo-check"      : "toggleDone",
    "dblclick .todo-content" : "edit",
    "click .todo-destroy"    : "clear",
    "keypress .todo-input"   : "updateOnEnter",
    "blur .todo-input"       : "close"
  },
  
  alive : function(){
    this.input = this.$(".todo-input");
    var el = this.el;
    this.model.bind("change:done", function(){$(el).toggleClass("done")});
    if( this.model.get("done") ) $(el).addClass("done");
  },
  
  toggleDone: function() {
    this.model.toggle();
  },

  edit: function() {
    $(this.el).addClass("editing");
    this.input.focus();
  },
  
  close: function() {
    this.model.save({content: this.input.attr("value")});
    $(this.el).removeClass("editing");
  },

  updateOnEnter: function(e) {
    if (e.which === 13) this.close();
  },
  
  clear: function() {
    this.model.destroy();
  }

});

this.AppView = Backbone.View.extend({
  id: "todoapp",
  events: {
    "keypress #new-todo" : "createOnEnter",
    "keyup #new-todo"    : "showTooltip",
    "click .todo-clear"  : "clearCompleted"
  },

  initialize: function() {
    _.bindAll(this, "items", "remainingItems", "remainingWord", "doneItems", "doneWord");
    this.model = Todos;
    this.dependencies(
      {"items add remove refresh" : "model",
      "doneItems change:done add remove refresh" : "model",
      "remainingItems change:items change:doneItems": "",
      "remainingWord change:remainingItems": "",
      "doneWord change:doneItems": "" });
  },
  
  alive : function() {
    this.input = this.$("#new-todo");
    this.model.fetch();
  },
  
  items: function(){
    return this.model.size()
  },
  
  remainingItems : function(){
    return this.items() - this.doneItems();
  },
  
  remainingWord : function(){
    return this.word(this.remainingItems());
  },
  
  doneItems : function(){
    return this.model.done().length;
  },
  
  doneWord : function(){
    return this.word(this.doneItems());
  }, 
  
  word : function(count){
    return (count === 1 ? "item" : "items");
  },

  createOnEnter: function(e) {
    if (e.which !== 13) return;
    
    Todos.create({
      content: this.input.attr("value"),
      done:    false
    });
    this.input.attr("value", "");
  },

  showTooltip: function(e) {      
    var tooltip = this.$(".ui-tooltip-top");
   
    tooltip.fadeTo("fast", 0);
    if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
    
    if (this.input.attr("value") !== "" && this.input.attr("value") !== this.input.attr("placeholder")) {
      this.tooltipTimeout = setTimeout(function(){
        tooltip.fadeTo("fast", 1);
      }, 1000);
    }
  },
  
  clearCompleted: function() {
    _.each(Todos.done(), function(todo){ todo.destroy(); });
    return false;
  }

});

$(function(){
  var app = new Backbone.Template($("#app-template").text());
  $("body").append(app.render());
  app.makeAlive();
});
