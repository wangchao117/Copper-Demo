var mathUtil = {
	letter: function(i){
		var a = ['A','B','C','D','E','F'];
		return a[i];
	},
	/**
	 * 多个习题处理.
	 * @param questions 习题VO对象集合
	 */
	parseTexMathQuestions:function(questions,colorFlag){
		for(var i = 0; i < questions.length; i++){
			this.parseTexMathQuestion(questions[i],null,colorFlag);
		}
	},
	/**
	 * 单个习题处理.
	 * @param question 习题VO对象
	 */
	parseTexMathQuestion:function(question, seq, colorFlag){
		question.mathContent = this.parseTexMathContent(question.content);
		if(question.type == "1" || question.type == "2"){
			// 单选与多选题处理
			question.mathContent += this.choiceFormat(question);
		}else if(question.type == "6"){
			// 复合题处理
			for(var i = 0; i < question.children.length; i++){
				this.parseTexMathQuestion(question.children[i], (i + 1));
				question.mathContent += "<div>"+(i+1)+"、" + question.children[i].mathContent + "</div>";
			}
		}
		
		// 提示处理
		question.mathHints = this.parseTexMathContent(question.hint);
		if(question.type == "6"){
			for(var i = 0; i < question.children.length; i++){
				question.mathHints += "<div style='height:auto;overflow:hidden;'>" + (i+1) + "、" + question.children[i].mathHints + "</div>"
			}
		}
		
		// 解析处理
		question.mathAnalysis = this.parseTexMathContent(question.analysis);
		if(question.type == "6"){
			for(var i = 0; i < question.children.length; i++){
				question.mathAnalysis += "<div style='height:auto;overflow:hidden;'>" + (i+1) + "、" + question.children[i].mathAnalysis + "</div>"
			}
		}
		
		// 正确答案
		var answers = "";
		if(question.type == "2"){
			if(seq){
				answers += "<div style='height:auto;overflow:hidden;'>";
				answers += seq + "、";
			}else{
				answers += "<div class='math-bank-line'>";
			}
			for(var i = 0; i < question.answers.length; i++){
				answers += question.answers[i].content;
				if(i < question.answers.length - 1){
					answers += "、";
				}
			}
			answers += "</div>";
		}else if(question.type == "6"){
			answers += "<div class='math-bank-line'>"
			for(var i = 0; i < question.children.length; i++){
				answers += question.children[i].mathHints;
			}
			answers += "</div>";
		}else{
			if(seq){
				answers += "<div style='height:auto;overflow:hidden;'><div class='fl'>" + seq + "、</div>";
			}
			
			for(var i = 0; i < question.answer.length; i++){
				var margin = "margin-right:10px;";
				var showAns = this.parseTexMathContent(question.answer[i]);
				if(question.type == "4"){
					if(showAns == "1"){
						showAns = "正确";
					}else if(showAns == "0"){
						showAns = "错误";
					}
				}
				if(seq){
					answers += "<div class='fl'>" + showAns + "</div>";		
				}else{
					answers += "<div class='math-bank-line'>" + showAns + "</div>";		
				}
				if(i < question.answer.length - 1){
					answers += "<div class='fl' style='"+margin+"'>、</div>";
				}
			}
			if(seq){
				answers += "</div>";
			}
		}
		question.mathAnswers = answers;
		
		var stuanswers = "";
		if(!question.studentHomeworkQuestion){
			return;
		}
		if(question.type == "2"){
			var color = "";
			if(colorFlag != false && question.studentHomeworkQuestion.result == "WRONG"){
				color = "red";
			}else if(colorFlag != false && question.studentHomeworkQuestion.result == "RIGHT"){
				color = "green";
			}
			stuanswers += "<div class='math-bank-line ans-color-"+question.studentHomeworkQuestion.id+" "+color+"'>";
			var stuans = "";
			for(var i = 0; i < question.studentHomeworkAnswers.length; i++){
				var contentAscii = question.studentHomeworkAnswers[i].contentAscii;
				if(contentAscii != ""){
					stuans += contentAscii;
					if(i < question.studentHomeworkAnswers.length - 1){
						stuans += "、";
					}
				}
			}
			if(stuans == ""){
				stuans = "&nbsp;"
			}else{
				var last = stuans.substring(stuans.length-1);
				if(last == "、"){
					stuans = stuans.substring(0, stuans.length-1);
				}
			}
			stuanswers += stuans + "</div>"
		}else{
			for(var i = 0; i < question.studentHomeworkAnswers.length; i++){
				var studentHomeworkAnswer = question.studentHomeworkAnswers[i];
				var color = "";
				if(colorFlag != false && studentHomeworkAnswer.result == "WRONG"){
					color = "red";
				}else if(colorFlag != false && studentHomeworkAnswer.result == "RIGHT"){
					color = "green";
				}
				
				var margin = "margin-right:10px;";
				var stuAns = this.parseTexMathContentForStuAnswer(studentHomeworkAnswer.contentAscii);
				if(question.type == "TRUE_OR_FALSE"){
					if(stuAns == "1"){
						stuAns = "正确";
					}else if(stuAns == "0"){
						stuAns = "错误";
					}
				}
				stuAns = stuAns == "" ? "&nbsp;" : stuAns;
				stuanswers += "<div class='math-bank-line ans-color-"+studentHomeworkAnswer.studentHomeworkQuestionId+" "+color+"'>" + stuAns + "</div>";		
				if(i < question.studentHomeworkAnswers.length - 1){
					stuanswers += "<div class='fl' style='"+color+";"+margin+"'>、</div>";
				}
			}
		}
		
		question.mathStudentAnswers = stuanswers;
	},
	/**
	 * 单个习题处理（错题练习）.
	 * @param question 习题VO对象
	 */
	parseTexMathQuestionForWork:function(question){
		question.mathContent = this.parseTexMathContentForWork(question.content);
		if(question.type == "1" || question.type == "2"){
			question.mathContent += this.choiceFormatForDo(question);
		}else if(question.type == "4"){
			var ans = (question.studentHomeworkAnswers && question.studentHomeworkAnswers.length > 0) ? question.studentHomeworkAnswers[0].content : "";
			var html = "<table class='danxuan-ans answer-cir' style='width:100%;table-layout:fixed;'><tr>";
			var selectClassName = "duo";
			for(var i = 0; i < 2; i++){
				if((i == 0 && ans == "1") || (i == 1 && ans == "0")){
					selectClassName = "on";
				}else{
					selectClassName = "duo";
				}
				var name = i == 0 ? "正确" : "错误";
				var style = "margin-right:15px;";
				html += "<td style='50%;word-wrap:break-word;overflow:hidden;padding:1px;'>";
				html += '<div style="'+style+'"><span class="single-choice '+selectClassName+'">' + name + '</span></div>';
				html += "</td>";
			}
			html += "</tr></table>";
			question.mathContent += html;
		}
		
		question.mathAnalysis = this.parseTexMathContentForWork(question.analysis);
		var answers = "";
		for(var i = 0; i < question.answers.length; i++){
			var margin = "margin-right:10px;";
			var stuAns = this.parseTexMathContentForWork(question.answers[i].content);
			if(question.type == "4"){
				stuAns = stuAns == "1" ? "正确" : "错误";
			}
			stuAns = stuAns == "" ? "&nbsp;" : stuAns;	
			answers += "<div class='math-bank-line'>" + stuAns + "</div>";		
			if(i < question.answers.length - 1){
				answers += "<div class='fl' style='"+margin+"'>、</div>";
			}
		}

		question.mathAnswers = answers;
	},
	/**
	 * 单个习题处理（做作业）.
	 * @param question 习题VO对象
	 */
	parseTexMathQuestionForDo:function(question){
		question.mathContent = this.parseTexMathContentForDo(question);
		// 单选题的处理
		if(question.type == "1" || question.type == "2"){
			question.mathContent += this.choiceFormatForDo(question);
		}else if(question.type == "4"){
			var ans = (question.studentHomeworkAnswers && question.studentHomeworkAnswers.length > 0) ? question.studentHomeworkAnswers[0].content : "";
			var html = "<table class='danxuan-ans answer-cir' style='width:100%;table-layout:fixed;'><tr>";
			var selectClassName = "duo";
			for(var i = 0; i < 2; i++){
				if((i == 0 && ans == "1") || (i == 1 && ans == "0")){
					selectClassName = "on";
				}else{
					selectClassName = "duo";
				}
				var name = i == 0 ? "正确" : "错误";
				var style = "margin-right:15px;";
				html += "<td style='50%;word-wrap:break-word;overflow:hidden;padding:1px;'>";
				html += '<div style="'+style+'"><span class="single-choice '+selectClassName+'">' + name + '</span></div>';
				html += "</td>";
			}
			html += "</tr></table>";
			question.mathContent += html;
		}
		question.mathAnalysis = this.parseTexMathContentForWork(question.analysis);
		var answers = "";
		for(var i = 0; i < question.answers.length; i++){
			answers += this.parseTexMathContentForWork(question.answers[i].content) + "&nbsp;&nbsp;&nbsp;&nbsp;";
		}

		question.mathAnswers = answers;
	},
	/**
	 * 单个内容处理.
	 * @param content 文本内容.
	 */
	parseTexMathContent:function(content){
		var txt = content.replace(/<ux-blank sequence=\d+><\/ux-blank>/g, "__________");
		txt = txt.replace(/<img[^>]+class="insert_fill_txt"[\s\S]*?>/g, "__________");
		txt = txt.replace(/<ux-mth>([^"]+?)<\/ux-mth>/g, function(match, capture){
			capture = capture.replace(/</g, "&lt;");
			capture = capture.replace(/>/g, "&gt;");
			capture = capture.replace(/\\$/gi, "");
			return "$" + capture + "$";
		});
		return txt;
	},
	/**
	 * 单个内容处理.
	 * @param content 文本内容.
	 */
	parseTexMathContentForStuAnswer:function(content){
		if($.trim(content) == ""){
			return "";
		}
		var txt = content.replace(/<ux-blank sequence=\d+><\/ux-blank>/g, "__________");
		txt = txt.replace(/<img[^>]+class="insert_fill_txt"[\s\S]*?>/g, "__________");
		txt = txt.replace(/<ux-mth>([^"]+?)<\/ux-mth>/g, function(match, capture){
			capture = capture.replace(/</g, "&lt;");
			capture = capture.replace(/>/g, "&gt;");
			capture = capture.replace(/\\$/gi, "");
			
			// 中文处理
			var _capture = capture.replace(/([^\u4e00-\u9fa5]*)/g, function(match, capture){
				return $.trim(capture) == "" ? capture : "`" + capture + "`";
			});
			return _capture;
		});
		return txt == "" ? "&nbsp;" : txt;
	},
	/**
	 * 单个内容处理（错题练习）.
	 * @param content 文本内容.
	 */
	parseTexMathContentForWork:function(content){
		var txt = content.replace(/<ux-blank sequence=\d+><\/ux-blank>/g, function(match, capture){
			var id = Math.random().toString().replace('0.','id');
			return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content hide"></div><input id="input'+id+'" type="text" class="work-math-input input-init" placeholder="点击输入答案"><i class="fx hide"></i></div>';
		});
		txt = txt.replace(/<img[^>]+class="insert_fill_txt"[\s\S]*?>/g, function(match, capture){
			var id = Math.random().toString().replace('0.','id');
			return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content hide"></div><input id="input'+id+'" type="text" class="work-math-input input-init" placeholder="点击输入答案"><i class="fx hide"></i></div>';
		});
		txt = txt.replace(/<ux-mth>([^"]+?)<\/ux-mth>/g, function(match, capture){
			capture = capture.replace(/</g, "&lt;");
			capture = capture.replace(/>/g, "&gt;");
			capture = capture.replace(/\\$/gi, "");
			return "$" + capture + "$";
		});
		return txt;
	},
	/**
	 * 单个内容处理（做作业）.
	 * @param content 文本内容.
	 */
	parseTexMathContentForDo:function(question){
		var num = 0;
		var txt = question.content.replace(/<ux-blank sequence=\d+><\/ux-blank>/g, function(match, capture){
			var id = Math.random().toString().replace('0.','id');
			var answer = "";
			if(num < question.studentHomeworkAnswers.length){
				answer = question.studentHomeworkAnswers[num].contentAscii;
			}
			num += 1;
			if(answer == ""){
				return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content hide"></div><input id="input'+id+'" type="text" class="work-math-input input-init" placeholder="点击输入答案"><i class="fx hide"></i></div>';
			}else{
				var answer1 = answer.replace(/<ux-mth>([^"]*?)<\/ux-mth>/g, function(match, capture){
					capture = capture.replace(/</g, "&lt;");
					capture = capture.replace(/>/g, "&gt;");
					capture = capture.replace(/\\$/gi, "");
					return capture;
				});
				var _answer = "";
				if($.trim(answer1) != ""){
					// 中文处理
					_answer = answer1.replace(/([^\u4e00-\u9fa5]*)/g, function(match, capture){
						return $.trim(capture) == "" ? capture : "`" + capture + "`";
					});
				}
				return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content">'+_answer+'</div><input id="input'+id+'" type="text" class="work-math-input hide" value="'+answer1+'"><i class="fx hide"></i></div>';
			}
		});
		txt = txt.replace(/<img[^>]+class="insert_fill_txt"[\s\S]*?>/g, function(match, capture){
			var id = Math.random().toString().replace('0.','id');
			var answer = "";
			if(num < question.studentHomeworkAnswers.length){
				answer = question.studentHomeworkAnswers[num].contentAscii;
			}
			num += 1;

			if(answer == ""){
				return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content hide"></div><input id="input'+id+'" type="text" class="work-math-input input-init" placeholder="点击输入答案"><i class="fx hide"></i></div>';
			}else{
				var answer1 = answer.replace(/<ux-mth>([^"]*?)<\/ux-mth>/g, function(match, capture){
					capture = capture.replace(/</g, "&lt;");
					capture = capture.replace(/>/g, "&gt;");
					capture = capture.replace(/\\$/gi, "");
					return capture;
				});
				var _answer = "";
				if($.trim(answer1) != ""){
					// 中文处理
					_answer = answer1.replace(/([^\u4e00-\u9fa5]*)/g, function(match, capture){
						return capture == "" ? "" : "`" + capture + "`";
					});
				}
				return '<div class="questionBlankDo"><div id="view_input'+id+'" class="input-content">'+_answer+'</div><input id="input'+id+'" type="text" class="work-math-input hide" value="'+answer1+'"><i class="fx hide"></i></div>';
			}
		});
		txt = txt.replace(/<ux-mth>([^"]+?)<\/ux-mth>/g, function(match, capture){
			capture = capture.replace(/</g, "&lt;");
			capture = capture.replace(/>/g, "&gt;");
			capture = capture.replace(/\\$/gi, "");
			return "$" + capture + "$";
		});
		return txt;
	},
	/**
	 * 选项排版.
	 */
	choiceFormat: function(question){
		var choices =[];
		
		if(typeof(question.choiceF) != undefined && question.choiceF != null){
			choices.push(question.choiceA);
			choices.push(question.choiceB);
			choices.push(question.choiceC);
			choices.push(question.choiceD);
			choices.push(question.choiceE);
			choices.push(question.choiceF);
		}else if(typeof(question.choiceE) != undefined && question.choiceE != null){
			choices.push(question.choiceA);
			choices.push(question.choiceB);
			choices.push(question.choiceC);
			choices.push(question.choiceD);
			choices.push(question.choiceE);
		}else if(typeof(question.choiceD) != undefined && question.choiceD != null){
			choices.push(question.choiceA);
			choices.push(question.choiceB);
			choices.push(question.choiceC);
			choices.push(question.choiceD);
		}else if(typeof(question.choiceC) != undefined && question.choiceC != null){
			choices.push(question.choiceA);
			choices.push(question.choiceB);
			choices.push(question.choiceC);
		}else if(typeof(question.choiceB) != undefined && question.choiceB != null){
			choices.push(question.choiceA);
			choices.push(question.choiceB);
		}
		var length = choices.length;
		var html = "<table style='width:100%;table-layout:fixed;'>";
		if(question.choiceFormat == "HORIZONTAL"){ // 横排
			html += "<tr>";
			var tdWidth = "width:100%";
			if(length == 2){
				tdWidth = "width:50%";
			}else if(length == 3){
				tdWidth = "width:33%";
			}else if(length == 4){
				tdWidth = "width:25%";
			}
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				var style = "margin-right:10px;";
				html += "<td style='"+tdWidth+";word-wrap:break-word;overflow:hidden;' valign='top'>";
				html += "<div style='"+style+"'>" + this.letter(i) + '.&nbsp;';
				html += "<span wbreak>"+mathValue+"</span>";
				html += "</div></td>";
			}
			html += "</tr>";
		}else if(question.choiceFormat == "VERTICAL"){ // 竖排
			var tdWidth = "width:100%";
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				html += "<tr>";
				html += "<td style='"+tdWidth+";word-wrap:break-word;overflow:hidden;' valign='top'>";
				html += "<div>" + this.letter(i) + '.&nbsp;';
				html += "<span wbreak>"+mathValue+"</span>";
				html += "</div></td>";
				html += "</tr>";
			}
		}else{ // 并排
			var tdWidth = "width:50%";
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				var style = "";
				if(i % 2 == 0){
					style = "margin-right:10px;margin-bottom:5px;";
					html += "<tr>";
				}
				html += "<td style='"+tdWidth+";word-wrap:break-word;overflow:hidden;' valign='top'>";
				html += "<div style='"+style+"'>" + this.letter(i) + '.&nbsp;';
				html += "<span wbreak>"+mathValue+"</span>";
				html += "</div></td>";
				if(i % 2 != 0){
					html += "</tr>";
				}
			}
		}
		html += "</table>";
		return html;
	},
	/**
	 * 选项排版（做作业）.
	 */
	choiceFormatForDo: function(question){
		var choices = question.choices;
		var length = choices.length;
		var selectClassName = "duo";
		var tableClassName = question.type == "SINGLE_CHOICE" ? "answer-cir" : "answer-squ";
		var choiceClassName = question.type == "SINGLE_CHOICE" ? "single-choice" : "muti-choice";
		var ans = "";
		if(question.studentHomeworkAnswers && question.studentHomeworkAnswers.length > 0){
			for(var i = 0; i < question.studentHomeworkAnswers.length; i++){
				ans += question.studentHomeworkAnswers[i].content;
			}
		}

		var html = "<table class='danxuan-ans "+tableClassName+"' style='width:100%;table-layout:fixed;'>";
		if(question.choiceFormat == "HORIZONTAL"){ // 横排
			html += "<tr>";
			var tdWidth = "width:100%";
			if(length == 2){
				tdWidth = "width:50%";
			}else if(length == 3){
				tdWidth = "width:33%";
			}else if(length == 4){
				tdWidth = "width:25%";
			}
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				if(ans.indexOf(this.letter(i)) != -1){
					selectClassName = "on";
				}else{
					selectClassName = "duo";
				}
				var style = "margin-right:15px;";
				html += "<td style='"+tdWidth+";word-wrap:break-word;overflow:hidden;padding:1px;' valign='top'>";
				html += '<div style="'+style+'"><span class="'+choiceClassName+' '+selectClassName+'" wbreak>' + this.letter(i) + ". " + mathValue + '</span></div>';
				html += "</td>";
			}
			html += "</tr>";
		}else if(question.choiceFormat == "VERTICAL"){ // 竖排
			var tdWidth = "width:100%";
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				if(ans.indexOf(this.letter(i)) != -1){
					selectClassName = "on";
				}else{
					selectClassName = "duo";
				}
				html += "<tr>";
				html += "<td style='"+tdWidth+";word-wrap:break-word;overflow:hidden;padding:1px;' valign='top'>";
				html += '<div ><span class="'+choiceClassName+' '+selectClassName+'" wbreak>' + this.letter(i) + ". " + mathValue + '</span></div>';
				html += "</td>";
				html += "</tr>";
			}
		}else{ // 并排
			var tdWidth = "width:50%";
			for(var i = 0; i < choices.length; i++){
				var mathValue = $.trim(choices[i]);
				if(mathValue != ""){
					mathValue = this.parseTexMathContent(mathValue)
				}
				if(ans.indexOf(this.letter(i)) != -1){
					selectClassName = "on";
				}else{
					selectClassName = "duo";
				}
				var style = "";
				if(i % 2 == 0){
					style = "margin-right:15px;margin-bottom:5px;";
					html += "<tr>";
				}
				html += "<td style='"+tdWidth+";padding:1px;' valign='top'>";
				html += '<div style="'+style+'"><span class="'+choiceClassName+' '+selectClassName+'" wbreak>' + this.letter(i) + ". " + mathValue + '</span></div>';
				html += "</td>";
				if(i % 2 != 0){
					html += "</tr>";
				}
			}
		}
		html += "</table>";
		return html;
	}
}