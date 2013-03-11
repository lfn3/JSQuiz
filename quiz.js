(function(questionId, fieldSetId, nextButtonId){
	quiz = {};

	var currentQuestion = 0;
	var score = 0;

	var allQuestions = [{question: "Who is Prime Minister of the United Kingdom?", 
	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Cave Johnson"], 
	correctAnswer:0}, {question: "Who is the CEO of arpeture labrotories??", 
	choices: ["GLADOS", "Chell", "Wheatley", "Cave Johnson"], 
	correctAnswer:3}];

	var fieldSet = document.getElementById(fieldSetId);

	showScore = function(){
		fieldSet.parentNode.style.visibility = "hidden";
		reWriteQuestion("Your score is: " + score + "!");
	}

	reWriteQuestion = function(newQuestion){
		if(newQuestion){
			document.getElementById(questionId).firstChild.nodeValue = newQuestion;
		}else{
			document.getElementById(questionId).firstChild.nodeValue = allQuestions[currentQuestion].question;
		}
	}

	setRadios = function(current, target){
		if (current < target){
			for (; current < target; current++){

				var newLabel = document.createElement("label");
				newLabel.id = "answer" + current + "Text";
				newLabel.appendChild(document.createTextNode(allQuestions[currentQuestion].choices[current]));

				var newRadio = document.createElement("input");
				newRadio.name = "answer";
				newRadio.type = "radio";
				newRadio.value = current;

				newLabel.appendChild(newRadio);
				fieldSet.appendChild(newLabel);
			}
		}else if (current > target){
			while(current > target){
				node = fieldSet.lastChild;
				while(node.nodeType !== Node.ELEMENT_NODE && node.nodeName.toLowerCase() !== 'input'){
					node = node.previousSibling;
				}
				console.log(node);
				node.remove();
				current--;
			}
		}else{
			console.log("Bad values passed to setRadios()...");
		}
	}

	reWriteAnswers = function(){
		for (i = 0, j = 0; i < fieldSet.childNodes.length; i++){
			if(fieldSet.childNodes[i].nodeType === Node.ELEMENT_NODE && fieldSet.childNodes[i].nodeName.toLowerCase() == 'label'){
				fieldSet.childNodes[i].firstChild.nodeValue = allQuestions[currentQuestion].choices[j];
				j++;
			}
		}
		if (j != allQuestions[currentQuestion].choices.length) {
			setRadios(j, allQuestions[currentQuestion].choices.length)
		}
	}

	updateScore = function(){
		radios = document.getElementsByName("answer")
		for(i = 0; i < radios.length; i++){
			if(radios[i].checked && radios[i].value == allQuestions[currentQuestion].correctAnswer){
				score++;
			}
		}
	}

	window.onload = function(){
		reWriteQuestion();
		reWriteAnswers();
	}

	document.getElementById(nextButtonId).onclick = function(){
		updateScore();
		currentQuestion++;
		if (currentQuestion >= allQuestions.length){
			showScore();
		} else {
			reWriteQuestion();
			reWriteAnswers();
		}
	};

	return quiz;
})("question", "answerFieldSet", "nextButton");