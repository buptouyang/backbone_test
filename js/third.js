$(function(){
	var Todo = Backbone.Model.extend({
		defaults:function(){
			return{
				title:"default-title",
				content:"default-content"
			};
		},
		initialize:function(){
			if(!this.get("title")){
				this.set({"title":this.defaults().title});
			}
		}
	});
	var Todos = Backbone.Collection.extend({
		model:Todo
	});
	//var todo = new Todo;
	var listview = Backbone.View.extend({
		tagName:"div",
		className:"list-group-item",
		template:Handlebars.compile($('#item-template').html()),
		events:{
			"click #delete": "deleteone",
		},
		initialize:function(){
		this.listenTo(this.model, 'change', this.render);
      	this.listenTo(this.model, 'destroy', this.remove);
      	alert("listview");
		},
		render:function(){	
		    this.$el.html(this.template(this.model.toJSON()));
      		return this;		
		},
		deleteone:function(){
			alert("deleteone");
			this.model.destroy();
		}
	});
	var todos = new Todos;
	var appview = Backbone.View.extend({
		el: $("#todoapp"),
		listTemplate:Handlebars.compile($('#stats-template').html()),
		initialize:function(){
			
			this.listenTo(todos, 'add', this.createone);
			$("#addbtn").on("click",this.addone);

		},
		render:function(){			
			this.$el.html(this.listTemplate());
		},
		clear: function() {
			alert("clear");
      		this.model.destroy();
    	},
		addone:function(){
			var title = $("#addtitle").val();
			var content=$("#addcontent").val();
			if(!title){
				this.clear();
			}else{
				todos.create({title: title,content:content});
				alert(title);
      			$("#addtitle").val('');
      			$("#addcontent").val('');
			}
		},
		createone:function(todo){
			var view = new listview({model: todo});
      		this.$("#todo-list").append(view.render().el);
		}
	});
	var a = new appview;
})//end
