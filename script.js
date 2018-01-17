$(document).ready(function(){

	var soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
	var count = 0;
	var arrComp = [];
	var arrUser = [];
	var time = 0;
	var start = false;
	var strict = false;
	$('#count').text('');
	var gameOn = false;
	var random = [
		{
			id: 0,
			name:  $('#green'),
			color: '#266d0d',
			sound: soundGreen,
			originalColor: '#3eaf15' 
		},
		{
			id: 1,
			name: $('#red'),
			color: '#af1628',
			sound: soundRed,
			originalColor: '#f2263e '
		},
		{
			id: 2,
			name: $('#yellow'),
			color: '#a3921a',
			sound: soundYellow,
			originalColor: '#ffe523'
		},
		{
			id: 3,
			name: $('#blue'),
			color: '#13438e',
			sound: soundBlue,
			originalColor: '#1f68dd'
		}
	];
	$("#ck").click(function(){    
	    gameOn = (gameOn == false) ? true : false;
	    if(gameOn) {
	    	$('#count').text('--');

	      	$('#start').click(function(){

	      		if(start == false && strict == false){
	      			start = true;
					strict = false;
					$('#start').css({'color': 'red', 'background-color':'#242424'});
					compPlay();
					playerPlay();
	      		}	
			});

			$('#strict').click(function(){

				if(start == false && strict == false){
					strict = true;
					start = false;
					$('#strict').css({'color': 'yellow', 'background-color':'#242424'});
					compPlay();
					playerPlay();	
				}
			});
			
	    }
	    else {
		    $('#count').text('');
		    count = 0;
			arrComp = [];
			arrUser = [];
		    time = 0;
			start = false;
			strict = false;
			$('#start').css({'color': '#242424', 'background-color':'red'});
			$('#strict').css({'color': '#242424', 'background-color':'yellow'});
		}  
	});

	function playerPlay(){

		$('#green').click(function(){
			soundGreen.play();
			random[0]['name'].css('background-color', random[0]['color']);
			setTimeout(function(){
				random[0]['name'].css('background-color', random[0]['originalColor']);
			},200);
			arrUser.push(random[0]['id']);
			if(arrComp.length == arrUser.length){
				compare();
			}
		});
		$('#red').click(function(){
			soundRed.play();
			random[1]['name'].css('background-color', random[1]['color']);
			setTimeout(function(){
				random[1]['name'].css('background-color', random[1]['originalColor']);
			},200);
			arrUser.push(random[1]['id']);
			if(arrComp.length == arrUser.length){
				compare();
			}
		});
		$('#yellow').click(function(){
			soundYellow.play();
			random[2]['name'].css('background-color', random[2]['color']);
			setTimeout(function(){
				random[2]['name'].css('background-color',random[2]['originalColor']);
			},200);
			arrUser.push(random[2]['id']);
			if(arrComp.length == arrUser.length){
				compare();
			}
		});
		$('#blue').click(function(){
			soundBlue.play();
			random[3]['name'].css('background-color', random[3]['color']);
			setTimeout(function(){
				random[3]['name'].css('background-color', random[3]['originalColor']);
			},200);
			arrUser.push(random[3]['id']);
			if(arrComp.length == arrUser.length){
				compare();
			}
		});	
				
	}

	function compare(){
		for(i = 0; i < arrComp.length; i++){

			if(arrComp[i] == arrUser[i]){
				playAll(arrComp[i]);
				time = time + 800;
				if(count == 20){
					swal('You Win!');
					setTimeout(reload, 1500);
				}
			}
			else{

				if(strict){
					$('#count').text('Over');
					swal('Game Over');
					setTimeout(reload, 1500);
				}
				else if(start){
					$('#count').text('Err');
					arrUser = [];
					setTimeout(redo, time + 400);
				}
				
				return;
			}

		}
		setTimeout(compPlay, 1600 + time);
		time = 0;
	}

	function redo(){

		count = arrComp.length;
		$('#count').text(count);
		arrUser = [];
		for(j = 0; j < arrComp.length; j++){
			playAll(arrComp[j]);
			time = time + 800;
		}
		time = 0;
	}

	function playAll(num){

		var that = random[num]['sound'];
		var that2 = random[num]['name'];
		var that3 = random[num]['color'];
		var that4 = random[num]['originalColor'];
		setTimeout(function(){
			that.play();
			that2.css('background-color', that3);
			setTimeout(function(){
				that2.css('background-color', that4);
			},200);
		
		},800 + time);		

	}

	function compPlay(){

		count++;
		$('#count').text(count);
		var i = Math.floor(Math.random()*4);
		random[i]['sound'].play();
		random[i]['name'].css('background-color', random[i]['color']);
		arrComp.push(random[i]['id']);
		arrUser = [];
		setTimeout(function(){
			random[i]['name'].css('background-color', random[i]['originalColor']);
		}, 200);
	}

	function reload(){
		history.go(0);
	}


});