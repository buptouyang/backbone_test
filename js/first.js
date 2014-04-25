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
	var Todos = Backbone.Model.extend({
		model:Todo
	});
/*	var collection=new Backbone.Collection([
		{num:"5",title:"a"},
		{num:"5",title:"a"}
	]);*/
	var todo = new Todos;
	var listview = Backbone.View.extend({
		model:todo,
		tagName:"li",
		className:"list-group-item",
		template:Handlebars.compile($('#item-template').html()),
		events:{
			"click #delete": "deleteone",
		},
		initialize:function(){
			alert("dsdfadf");
			this.model.on('change',this.render,this);
			$("#addbtn").on("click",this.addone);
			//this.listenTo(this.model,'destroy',this.move);
		},
		render:function(){			
			//this.$el.html(this.template({title:title,content:content}));
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.appendTo($("#todo-list"));
		},
		clear: function() {
      		this.model.destroy();
    	},
		addone:function(){
			var title = this.$("#addtitle").val();
			var content=this.$("#addcontent").val();
			alert("click");
			if(!title){
				this.clear();
			}else{
				this.model.set({title:title,content:content});
				//Todos.create({title: this.input.val()});
      			this.$("#addtitle").val('');
      			this.$("#addcontent").val('');
			}

		}
	});
	//var view = new listview;
	var list = Backbone.View.extend({
		model:todo,
		tagName:"div",
		className:"list-group-item",
		template:Handlebars.compile($('#item-template').html()),
		events:{
			"click #delete": "deleteone",
		},
		addone:function(){
			alert("adsf");
			this.model.create({title: "abc",content:"efg"});
		},
		initialize:function(){
			alert("initialize");
			this.$el.html(this.template({title:"abc",content:"abccontent"}));
			//alert(this.$el.html());
			//this.$el.html(this.template(this.model.toJSON()));
			this.$el.appendTo($("#todo-list"));
			$("#addbtn").on("click",this.addone);
			this.model.on('change',this.render,this);
			//this.listenTo(this.model,'destroy',this.move);
		},
		render:function(){	
			var title = this.$("#addtitle").val();
			var content=this.$("#addcontent").val();
			alert("render");
			//this.$el.html(this.template({title:"title",content:"content"}));
			//this.$el.html(this.template(this.model.toJSON()));
			//this.$("#todo-list").append(this.$el);
		},
		
		
		deleteone:function(){
			alert("1111");
			this.$el.destroy();
			//this.$el.html(this.template({title:"abc",content:"abccontent"}));
			//alert(this.$el.html());
			//this.$el.html(this.template(this.model.toJSON()));
			//this.$el.appendTo($("#todo-list"));

		}
	});
	var a = new list;
})//end
