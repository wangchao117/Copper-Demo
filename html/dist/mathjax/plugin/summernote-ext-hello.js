(function(factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);

    } else {
        // Browser globals: jQuery
        factory(window.jQuery);

    }

} (function($) {
    // template
    var tmpl = $.summernote.renderer.getTemplate();

    /**
   * @class plugin.hello 
   * 
   * Hello Plugin  
   */
    $.summernote.addPlugin({
        /** @property {String} name name of plugin */
        name: 'hello',
        /** 
     * @property {Object} buttons 
     * @property {Function} buttons.hello   function to make button
     * @property {Function} buttons.helloDropdown   function to make button
     * @property {Function} buttons.helloImage   function to make button
     */
        buttons: {
            // buttons
            hello: function(lang, options) {

                return tmpl.iconButton(options.iconPrefix + 'header', {
                    event: 'hello',
                    title: '插入公式',
                    hide: true

                });

            },
            helloDropdown: function(lang, options) {
				var feMathArr = [
				  {type:"1",value:"∵",name:"\\pm",title:"加减",index:0},//加减
				  {type:"1",value:"∴",name:"\\mp",title:"减加",index:1},//减加
				  {type:"1",value:"∠",name:"+",title:"加",index:3},//角
				  {type:"1",value:"⊥",name:"-",title:"减",index:4},//垂直
				  {type:"1",value:"||",name:"\\times",title:"乘",index:5},//平行
				  {type:"1",value:"△",name:"\\div",title:"除",index:6},//三角形
				  {type:"1",value:"▱",name:"\\cdot",title:"点乘",index:7},//平行四边形
				  {type:"1",value:"•",name:"\\ast",title:"星号运算符",index:8},//点乘
				  {type:"1",value:"°",name:"\\circ",title:"度",index:9},//度
				  {type:"1",value:"∞",name:"\\cap",title:"交",index:10},//无穷
				  {type:"1",value:"%",name:"\\cup",title:"并",index:11},//求余
				  {type:"1",value:"π",name:"\\varnothing",title:"空集",index:12},//派
				  {type:"1",value:"′",name:"\\complement",title:"补码",index:13},//分
				  {type:"1",value:"″",name:"\\oplus",title:"二阶导数",index:14},//秒
				  {type:"1",value:"——",name:"\\ominus",title:"平均值",index:15},//平均值 未实现
				  {type:"1",value:"——>",name:"\\otimes",title:"向量",index:16},//向量
				  {type:"1",value:"subscript",name:"\\odot",title:"下标",index:17}//下标
				  ]

                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feMathArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'oper', {
                    title: '常用公式',
                    hide: true,
                    dropdown: dropdown

                });

            },
            helloImage: function(lang, options) {
                return tmpl.iconButton(options.iconPrefix + 'math', {
                    event: 'helloImage',
                    title: '插入公式',
                    hide: true
                });

            },
			inertFill: function(lang, options) {
                return tmpl.iconButton(options.iconPrefix + 'fill', {
                    event: 'inertFill',
                    title: '插入填空',
                    hide: true
                });
            },
			moreArrMath : function(lang, options) {
				var feMoreArr = [
				{type:"0",value:"∈",name:"\\cdots",title:"中线水平省略号",index:18},//属于
				{type:"0",value:"∉",name:"\\because",title:"因为",index:19},//不属于
				{type:"0",value:"⊆",name:"\\therefore",title:"所以",index:20},//左包含
				{type:"0",value:"⊇",name:"\\angle",title:"角",index:21},//右包含
				{type:"0",value:"⊈",name:"\\perp",title:"垂直于",index:22},//右不包含
				{type:"0",value:"⊉",name:"\\parallel",title:"平行于",index:23},//左不包含
				{type:"0",value:"⊂",name:"\\triangle",title:"三角形",index:24},//⊂
				{type:"0",value:"⊃",name:"\\psquare",title:"平行四边形",index:25},//⊃
				{type:"0",value:"⊂",name:"\\infty",title:"无穷大",index:26},//⊂ 未实现
				{type:"0",value:"⊃",name:"\\%",title:"百分比",index:27},//⊃ 未实现
				{type:"0",value:"∩",name:"\\celsius",title:"摄氏度",index:28}//交集
				];
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feMoreArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'misheader', {
                    title: '更多',
                    hide: true,
                    dropdown: dropdown
                });
            },
			symbolArrMath : function(lang, options) {
				var feSymbolArr = [
					  {type:"0",value:"∓",name:"<",title:"小于",index:29},//负正号
					  {type:"0",value:"±",name:">",title:"大于",index:30},//正负号
					  {type:"0",value:"+",name:"\\le",title:"小于等于",index:31},//+	
					  {type:"0",value:"-",name:"\\ge",title:"大于等于",index:32},//-	
					  {type:"0",value:"×",name:"\\approx",title:"约等于",index:33},//乘号
					  {type:"0",value:"÷",name:"\\neq",title:"不等于",index:34},//除号
					  {type:"0",value:"∗",name:"\\sim",title:"相似于",index:35},//米符号
					  {type:"0",value:"⋯",name:"\\cong",title:"全等于",index:36},//省略号
					  {type:"0",value:"∨",name:"\\in",title:"属于",index:37},//或
					  {type:"0",value:"∧",name:"\\notin",title:"不属于",index:38},//且
					  {type:"0",value:"¬",name:"\\subseteq",title:"包含于",index:39},//非
					  {type:"0",value:"<",name:"\\supseteq",title:"不包含于",index:40},//小于
					  {type:"0",value:">",name:"\\nsubseteq",title:"不包含",index:41},//大于	
					  {type:"0",value:"≤",name:"\\nsupseteq",title:"包含于",index:42},//小于等于
					  {type:"0",value:"≥",name:"\\subset",title:"包含",index:43},//大于等于
					   {type:"0",value:"=",name:"\\supset",title:"真包含于",index:246},//等于	
					  {type:"0",value:"=",name:"\\subsetneqq",title:"真包含于",index:44},//等于	
					  {type:"0",value:"≠",name:"\\supsetneqq",title:"真包含",index:45}
				]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feSymbolArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'syheader', {
                    title: '符号',
                    hide: true,
                    dropdown: dropdown
                });
            },
			greeceArrMath : function(lang, options) {
				var feGreeceArr = [
				  {type:"0",value:"α",name:"\\alpha",title:"α",index:46},//α
				  {type:"0",value:"β",name:"\\beta",title:"β",index:47},//β
				  {type:"0",value:"γ",name:"\\gamma",title:"γ",index:48},//γ
				  {type:"0",value:"δ",name:"\\delta",title:"δ",index:49},//δ
				  {type:"0",value:"ϵ",name:"\\epsilon",title:"ϵ",index:50},//ϵ
				  {type:"0",value:"θ",name:"\\zeta",title:"θ",index:51},//θ
				  {type:"0",value:"ξ",name:"\\eta",title:"ξ",index:52},//ξ
				  {type:"0",value:"λ",name:"\\theta",title:"λ",index:53},//λ
				  {type:"0",value:"μ",name:"\\kappa",title:"μ",index:54},//μ
				  {type:"0",value:"ρ",name:"\\lambda",title:"ρ",index:55},//ρ
				  {type:"0",value:"η",name:"\\mu",title:"η",index:56},//η
				  {type:"0",value:"π",name:"\\nu",title:"π",index:57},//π
				  {type:"0",value:"σ",name:"\\xi",title:"σ",index:58},//σ
				  {type:"0",value:"υ",name:"\\pi",title:"υ",index:59},//υ
				  {type:"0",value:"φ",name:"\\rho",title:"φ",index:60},//φ
				  {type:"0",value:"χ",name:"\\sigma",title:"χ",index:61},//χ
				  {type:"0",value:"ψ",name:"\\tau",title:"ψ",index:62},//ψ
				  {type:"0",value:"ω",name:"\\upsilon",title:"ω",index:63},//ω
				  {type:"0",value:"Δ",name:"\\varphi",title:"Δ",index:64},//Δ
				  {type:"0",value:"ϕ",name:"\\chi",title:"ϕ",index:65},//ϕ
				  {type:"0",value:"Ω",name:"\\psi",title:"Ω",index:66},//Ω
				  {type:"0",value:"Φ",name:"\\omega",title:"Φ",index:67},//Φ
				  {type:"0",value:"Ψ",name:"\\delta",title:"Ψ",index:68},//Ψ
				  {type:"0",value:"τ",name:"\\Phi",title:"τ",index:69},//τ
				  {type:"0",value:"Ψ",name:"\\Psi",title:"Ψ",index:70},//Ψ
				  {type:"0",value:"τ",name:"\\Omega",title:"τ",index:71}//τ
				]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feGreeceArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'grheader', {
                    title: '希腊',
                    hide: true,
                    dropdown: dropdown
                });
            },
			groArrMath : function(lang, options) {
				var feFunArr = [
				  {type:"1",value:"square",name:"\\neg",title:"平方",index:72},//平方
				  {type:"1",value:"cube",name:"\\forall",title:"立方",index:73},//立方
				  {type:"1",value:"exponent",name:"\\exists",title:"n次方",index:74},//n次方
				  {type:"1",value:"radicent",name:"\\vee",title:"根号",index:75},//根号
				  {type:"1",value:"radicent",name:"\\wedge",title:"立方根",index:76}
				  ]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feFunArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'logheader', {
                    title: '函数',
                    hide: true,
                    dropdown: dropdown
                });
            },
			rowArrMath : function(lang, options) {
				var feFunArr = [
				  {type:"1",value:"square",name:"\\left(\\right)",title:"圆括号",index:77},//平方
				  {type:"1",value:"cube",name:"\\left[\\right]",title:"方括号",index:78},//立方
				  {type:"1",value:"exponent",name:"\\left[\\right)",title:"半闭半开",index:79},//n次方
				  {type:"1",value:"radicent",name:"\\left(\\right]",title:"半开半闭",index:80},//根号
				  {type:"1",value:"radicent",name:"\\left\\{\\right\\}",title:"花括号",index:81},
				  {type:"1",value:"radicent",name:"\\left| {} \\right|",title:"绝对值",index:82},//根号
				  {type:"1",value:"radicent",name:"\\langle {} \\rangle",title:"半角括号",index:83}
				  ]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feFunArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'groheader', {
                    title: '函数',
                    hide: true,
                    dropdown: dropdown
                });
            },
			arrArrMath : function(lang, options) {
				var feFunArr = [
				  {type:"1",value:"square",name:"\\leftarrow",title:"左箭头",index:84},//平方
				  {type:"1",value:"cube",name:"\\rightarrow",title:"右箭头",index:85},//立方
				  {type:"1",value:"exponent",name:"\\Leftarrow",title:"左双线箭头",index:86},//n次方
				  {type:"1",value:"radicent",name:"\\Rightarrow",title:"右双线箭头",index:87},//根号
				  {type:"1",value:"radicent",name:"\\leftrightarrow",title:"左右箭头",index:88},
				  {type:"1",value:"radicent",name:"\\Leftrightarrow",title:"左右双线箭头",index:89}
				  ]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feFunArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'rowheader', {
                    title: '函数',
                    hide: true,
                    dropdown: dropdown
                });
            },
			accArrMath : function(lang, options) {
				var feFunArr = [
				  {type:"1",value:"square",name:"\\bar{ }",title:"平均数",index:90},//平方
				  {type:"1",value:"cube",name:"\\vec{}",title:"单字母表示的向量",index:91},//立方
				  {type:"1",value:"exponent",name:"\\overrightarrow{}",title:"向量",index:92},//n次方
				  {type:"1",value:"radicent",name:"{}^{}",title:"右上标",index:93},//根号
				  {type:"1",value:"radicent",name:"{}_{}",title:"右下标",index:94},
				  {type:"1",value:"radicent",name:"{}_{}^{}",title:"右标",index:95},
				  {type:"1",value:"radicent",name:"\\hat{}",title:"估计",index:96},
				  {type:"1",value:"radicent",name:"{}^\\prime",title:"导数",index:97},
				  {type:"1",value:"radicent",name:"\\overset{\frown}{}",title:"弧度",index:98},
				  {type:"1",value:"radicent",name:"\\lim_{}{}",title:"极限",index:99},
				  {type:"1",value:"radicent",name:"\\sqrt[]{}",title:"根式",index:100},
				  {type:"1",value:"radicent",name:"\\frac{ }{ }",title:"分号",index:101},
				  {type:"1",value:"radicent",name:"\\sum_{ }^{ }{}",title:"求和",index:102},
				  {type:"1",value:"radicent",name:"\\int_{ }^{ }{}",title:"积分",index:103},
				  {type:"1",value:"radicent",name:"\\begin{cases} {}\\\\{}\\end{cases}",title:"事例（两条件）",index:104},
				  {type:"1",value:"radicent",name:"\\begin{cases} {}\\\\{}\\\\{}\\end{cases}",title:"事例（三条件）",index:105},
				  {type:"1",value:"radicent",name:"\\overbrace{}^{}",title:"上注释",index:106},
				  {type:"1",value:"radicent",name:"\\underbrace{}_{}",title:"下注释",index:107},
				  {type:"1",value:"radicent",name:"\\begin{bmatrix} {}& {}\\\ {}& {}\\end{bmatrix}",title:"矩阵",index:108},
				  {type:"1",value:"radicent",name:"\\begin{vmatrix}{} &{} \\\ {} & {}\\end{vmatrix}",title:"行列式",index:109},
				  {type:"1",value:"radicent",name:"\\log_{}{}",title:"对数",index:110}
				  
				  ]
                var dropdown = '<ul class="matheditor-list dropdown-menu">' + MathEdit.getfeList(feFunArr) + '</ul>';
				
                return tmpl.iconButton(options.iconPrefix + 'accheader', {
                    title: '函数',
                    hide: true,
                    dropdown: dropdown
                });
            }
        },

/**
     * @property {Object} events 
     * @property {Function} events.hello  run function when button that has a 'hello' event name  fires click
     * @property {Function} events.helloDropdown run function when button that has a 'helloDropdown' event name  fires click
     * @property {Function} events.helloImage run function when button that has a 'helloImage' event name  fires click
     */
        events: {
            // events
            hello: function(event, editor, layoutInfo) {
                // Get current editable node
                var $editable = layoutInfo.editable();
                // Call insertText with 'hello'
                editor.insertText($editable, 'hello');

            },
			moreArrMath : function(event, editor, layoutInfo, value){
				MathEdit.done(event, editor, layoutInfo, value);
			},
			funArrMath : function(event, editor, layoutInfo, value){
				MathEdit.done(event, editor, layoutInfo, value);
			},
			greeceArrMath : function(event, editor, layoutInfo, value){
				MathEdit.done(event, editor, layoutInfo, value);
			},
			symbolArrMath : function(event, editor, layoutInfo, value){
				MathEdit.done(event, editor, layoutInfo, value);
			},
            helloDropdown: function(event, editor, layoutInfo, value) {
                MathEdit.done(event, editor, layoutInfo, value);
            },
			groArrMath: function(event, editor, layoutInfo, value) {
                MathEdit.done(event, editor, layoutInfo, value);
            },
			rowArrMath: function(event, editor, layoutInfo, value) {
                MathEdit.done(event, editor, layoutInfo, value);
            },
			arrArrMath: function(event, editor, layoutInfo, value) {
                MathEdit.done(event, editor, layoutInfo, value);
			},
			accArrMath: function(event, editor, layoutInfo, value) {
                MathEdit.done(event, editor, layoutInfo, value);
			},
            helloImage: function(event, editor, layoutInfo) {
                var $editable = layoutInfo.editable();
				var len = Math.random().toString().replace('0.','');
                var img = $('<span>&nbsp;<input id="demoSource_' + len + '" class="ioArea cur_bor" />&nbsp;</span>');
				$("body").append('<div id="warp_demoSource_' + len + '" class="hide"></div>');
                editor.insertNode($editable, img[0]);
				
				math = MathJax.Hub.getAllJax('demoRendering')[0];
				MathJax.Hub.Queue(["Text", math, '']);
				
				setTimeout(function(){
					$("input.cur_bor").focus();	
				},300);
                MathEdit.bind();
            },
			inertFill: function(event, editor, layoutInfo){
				var $editable = layoutInfo.editable();
				console.log(editor);
				//console.log($editable);
                var img = $('<span>&nbsp;<img src="/images/blank.png" style="border-bottom:1px solid #333;margin:0 1px;" class="insert_fill_txt">&nbsp;</span>');
                editor.insertNode($editable, img[0]);
			}
        }

    });

}));
var MathEdit = {
	done: function(event, editor, layoutInfo, value){
		var id = $("input.cur_bor").attr('id');
		this.addExpression(id,value);
		setTimeout(function(){
			$("#"+id).attr('data-rel',encodeURIComponent($("#"+id).val()));
			var t = widthGetter(id);
			$("#" + id).width(t + 8);
		},300);	
	},
	addExpression: function(myField, myValue){
		var str = $.trim($("#"+myField).val());
		myField = document.getElementById(myField);
		if (document.selection) {
			myField.focus(); //IE
			sel = document.selection.createRange();
			sel.text = myValue;
			sel.select();
		}else if (myField.selectionStart || myField.selectionStart == '0'){ //MOZILLA 
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			var restoreTop = myField.scrollTop;
			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos,myField.value.length);
			if (restoreTop > 0) {
				myField.scrollTop = restoreTop;
			}
			myField.focus();
			myField.selectionStart = startPos + myValue.length;
			myField.selectionEnd = startPos + myValue.length;
		}else{
			myField.value += myValue;
			myField.focus();
		}	
	},
    bind: function() {
        var _this = this;
		$("#create_stem_cont .title").unbind('click').bind('click', function(e){
			$("#demoRendering").hide();	
		});
		$("input.ioArea").unbind('paste').bind('paste', function(e){
			var pastedText = undefined;
			var id = $(this).attr('id');
			if (window.clipboardData && window.clipboardData.getData) { // IE
				 pastedText = window.clipboardData.getData('Text');
			} else {
				 pastedText = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
			}
			_this.addExpression(id,pastedText);
			setTimeout(function(){
				var t = widthGetter(id);
				$("#" + id).width(t + 8);
				MathEdit.set($("input.cur_bor").val(),id);
				$("input.cur_bor").focus();
				$("#" + id).attr('data-rel',encodeURIComponent($("input.cur_bor").val()));
			},500);
			e.stopPropagation();
			return false;	
		});
        $("input.ioArea").unbind('input').bind('input', 
        function(e) {
            var str = $(this).val();
			$(this).attr('data-rel',encodeURIComponent(str));
            var id = $(this).attr('id');
			var t = widthGetter(id);
            _this.set(str,id);
            $("#" + id).width(t + 8);
        });
        $("input.ioArea").unbind('focus').bind('focus', 
        function() {
			var id = $(this).attr('id');
            var str = $(this).val();
            var left = $(this).offset().left;
            var top = $(this).offset().top + 30;
            $("#demoRendering").show().css({
                top: top,
                left: left
            });
            _this.set(str,id,1);
			$("input.ioArea").removeClass('cur_bor');
			$(this).addClass('cur_bor');
        });
        $("input.ioArea").unbind('blur').bind('blur', function() {
        	//$(this).removeClass('cur_bor');
			$("#demoRendering").hide();
        });
        $(".ioArea").keyup(function(e) {
            var keycode = e.which;
            var str = $.trim($(this).val());
            if (keycode == 8 && str == '') {
                if ($(this).hasClass('red_bor')) {
                    $(this).remove();
					_this.setFocus();
					$("#demoRendering").hide();
                } else {
					$(this).addClass('red_bor');
                }
            }else{
				$(this).removeClass('red_bor');	
			}
        })
    },
    create: function(){
    	var that = this;
		var len = 0;
		var i = 0;
		$("input.ioArea").each(function(i){
    		len++;
			var id = $(this).attr('id');
			var str = decodeURIComponent($(this).attr('data-rel'));
			$(this).val(str);
			var t = widthGetter(id);
            $("#" + id).width(t + 8);
    		if($('#warp_'+id).length <= 0){
    			$("body").append('<div id="warp_'+id+'" class="hide"></div>');
    		}
    	});
		/*$("input.ioArea").each(function(i){  编辑预览
				
		});*/
    },
    set: function(str,id,flag) {
		var flag = flag || 0;
		math = MathJax.Hub.getAllJax('demoRendering')[0];
		MathJax.Hub.Queue(["Text", math, str]);
		$('#warp_'+id).html($("#demoRendering").html());
		if(!flag){
			this.view();//预览
		}
	},
	getHtml: function(id){
		var mHtml = $('#warp_'+id).html();
		return mHtml;
	},
	view: function(){
		var that = this;
		var sHTML = '<div>' + $('#summernote').code() + '</div>';
		var obj = $("<div>" + sHTML + "</div>");
		obj.find('.ioArea').each(function(index, element) {
            var str = $(this).attr('data-rel');
			var id = $(this).attr('id');
			var style = $(this).attr('style');
			
			var mHtml = that.getHtml(id);
			var reg ='/<input[^>]+id="'+id+'"[^>]*>/g';
			sHTML = sHTML.replace(eval(reg), mHtml);

		});
		$("#showmath").html(sHTML);
	},
	getfeList:function(feArr){
		var feList = ''
		for (var i = 0; i < feArr.length; i++) {
			
			feList += '<li class="fe-btnItem"><a data-type="'+ feArr[i]["type"] +'" data-name="'+ feArr[i]["name"] +'" data-event="helloDropdown" href="javascript:;" data-value="'+ feArr[i]["name"] +'" class="fe-btn l'+ feArr[i]['index'] +'"></a></li>';
		};
		return feList;
	},
	setFocus: function(){
		var id = $('.note-editable').attr('id');
		var $editable = $('#' + id);
		var img = $('<span></span>');
		setTimeout(function(){
			$.summernote.eventHandler.modules.editor.insertNode($editable, img[0]);
		},100);
	}
}
function widthGetter(id) {
    var t = $("body");
    var n = document.createElement("span");
    n.style.fontFamily = $("#" + id).css("font-family");
    n.style.fontSize = $("#" + id).css("font-size");
    $(n).css({
        "word-wrap": "normal",
        "word-break": "keep-all",
        "white-space": "nowrap"

    });
    if (!$("#" + id).val()) {
        $("#" + id).val('');

    }
    var r = $("#" + id).val().replace(/&/g, "$");
    n.innerHTML = r.replace(/\s/gi, "&nbsp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
    n.id = "latex-toget";
    n.setAttribute("class", "match");
    n.style.width = "";
    t.append(n);
    var i = $(n).width();
    $(n).remove();
    return i

}