window.Employee=Backbone.Model.extend({
	validate:function(attrs){
		for(var key in attrs){
			if(attrs(key)==''){
				return key+'不能为空';
			}
			if(key=="age" && isNaN(attrs.age)){
				return "年龄必须是数字";
			}
		}
	}
});
	var emplyee = new Employee();
window.EmployeeList = Backbone.Collection.extend({
	model:Employee,
	localStorage:new Store("emplyees")
});
	window.Employees=new EmployeeList();
window.EmployeeView=Backbone.View.extend({
	tagName:'tr',
	template:_.template($('#item-template').html()),
	events:{
		"dbclick td":'edit',
		'blur input,select':'close',
		'click .del':'clear',
	},
	initialize:function(){
		this.model.bind('change',this.render,this);
		this.model.bind('destroy',this.remove,this);
	},
	setText:function(){
		var model = this.model;
		this.input=$(this.el).find('input,select');
		this.input.each(function(){
			var input=$(this);
			input.val(model.get(input.attr("name")));
		});
	},
	close:function(e){
		var input =$(e.currentTarget);
		var obj={};
		obj[input.attr('name')]=input.val();
		this.model,save(obj);
		$(e.currentTarget).parent().parent().removeClass("editing");
	},
	edit:function(e){
		$(e.currentTarget).addClass('editing').find('input,select').focus();
	},
	render:function(){
		$(this.el).html(this.template(this.model.toJSON()));
		this.setText();
		return this;
	},
	remove:function(){
		$(this.el).remove();
	},
	clear:function(){
		this.model.destroy();
	}
});
window.AppView=Backbone.View.extend({
	el:$(#app),
})
/*http://blog.csdn.net/soasme/article/details/6581029*/