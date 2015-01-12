function clearpaceform(){
	$("#pacetime").slideUp();
	$("#errormessage").fadeOut();	
}

function clearsplitform(){
	$("#errormessage2").fadeOut();
	$("#splitstable").slideUp();
}

function clearfinishform(){
	$("#finishtime").slideUp();	
	$("#errormessage3").fadeOut();
}

function cleartrainingform(){
	$("#errormessage4").fadeOut();
	$("#trainingtimes").slideUp();
}

function clearpredictorform(){
	$("#errormessage5").fadeOut();
	$("#racetimes").slideUp();
}

function convertTime(t)
{
	var h;
	var m;
	var s;

	// convert
	h = Math.floor(t/3600);
	m = Math.floor((t - (3600*h))/60);
	s = Math.round(t - (3600*h) - (60*m));

	// format to string
	h = (h<10) ? "0" + h + ":" : h + ":";
	m = (m<10) ? "0" + m + ":" : m + ":";
	s = (s<10) ? "0" + s : s;
	
	if(h == "00:"){
		return (m + s);
	}
	else{
		return (h + m + s);	
	}
	
}

function calculatePace(h, m, s, d, measure){
	
	if(!isNaN(m) || !isNaN(s) || !isNaN(d)){
		
		if(measure.value == "km"){
			d = d*.62;
		}
		
		var secondsRun = (m*60)+s;
		if(!isNaN(h)){
			secondsRun = secondsRun+(h*3600);	
		}
		
		var pace = secondsRun/d;	
		return pace;
		
	}
	else{
		return -1;	
	}
		
}

function calculateMPH(pace){
		var paceDecimal = pace/60;
		var mph = 60/paceDecimal;
		return mph.toFixed(2);	
}

function paceCalculator(form){
	with(form){
		
		var h = parseFloat(timeh.value);
		var m = parseFloat(timem.value);
		var s = parseFloat(times.value);
		var d = parseFloat(distance.value);
		var measure = measure.value;
		
		var pace = calculatePace(h, m, s, d, measure);
		
		if(pace > 0){
			$("#errormessage").fadeOut();
			var output = "<table class='table'><thead><th>Pace</th><th>MPH</th></thead>";
			output = output + "<tr><td>";
			output = output + convertTime(pace);
			output = output + "</td><td>";
			output = output + calculateMPH(pace);
			output = output + "</td></tr>";
			
			$("#pacetime").html(output);
			$("#pacetime").slideDown();
		}
		else{
			$("#pacetime").slideUp();
			$("#errormessage").fadeIn();	
		}
		
		return false;
	}
}

function splitCalculator(form){
	with(form){
		
		var h = parseFloat(timeh.value);
		var m = parseFloat(timem.value);
		var s = parseFloat(times.value);
		var d = parseFloat(distance.value);
		var measure =  measure.value;
		
		var pace = calculatePace(h, m, s, d, measure);
		
		if(measure.value == "km"){
			d = d*.62;
		}
		if(pace > 0){
			
			$("#errormessage2").fadeOut();
			
			var mile = pace;
	
			var splits = "<table class='table table-striped'><thead><th>Mile</th><th>Time</thd></thead>";

			for(i=1;i<=d;i++){
				splits = splits + "<tr><td>"+(i)+"</td><td>"+convertTime(mile)+"</td></tr>";
				
				mile = mile + pace;
				
				
			}

			if(parseInt((mile-pace))!=parseInt((pace*d))&&(parseInt((mile-pace))+1)!=parseInt((pace*d))){
					var fraction = parseInt((d - parseInt(d)).toFixed(1)*10);
					splits = splits + "<tr><td>"+(i-1)+"."+fraction+"</td><td>"+convertTime(pace*d)+"</td></tr>";
					i++;
			}
			
			splits = splits + "</table>";
			
			$("#splitstable").html("<div class='splitpace'><p style='font-weight:bold;'>Your pace will be: "+convertTime(pace)+" ("+calculateMPH(pace)+"mph)</p></div>"+splits);
			
			$("#splitstable").slideDown();
		}
		else{
			$("#errormessage2").fadeIn();	
			$("#splitstable").slideUp();
		}
		
		return false;
	}
}

function finishCalculator(form){
	with(form){
		var h = 0;
		var m = parseFloat(timem.value);
		var s = parseFloat(times.value);
		var d = parseFloat(distance.value);
		var measure =  measure.value;
		
		var pace = calculatePace(h, m, s, d, measure);
		
		if(measure.value == "km"){
			d = d*.62;
		}
		
		if(pace > 0){
			$("#errormessage3").fadeOut();
			
			var output = "<table class='table'><thead><th>Projected Finish</th></thead>";
			output = output + "<tr><td>";
			output = output + convertTime(pace*d*d);
			output = output + "</td></tr></table>";
			
			$("#finishtime").html(output);
			$("#finishtime").slideDown();	
		}
		else{
			$("#errormessage3").fadeIn();
			$("#finishtime").slideUp();	
		}
	}
	return false;
}

function trainingCalculator(form){
	
	with(form){
		var h = parseFloat(timeh.value);
		var m = parseFloat(timem.value);
		var s = parseFloat(times.value);
		var d = parseFloat(distance.value);
		var measure =  "mile";
		
		var pace = calculatePace(h, m, s, d, measure);
		
		if(measure.value == "km"){
			d = d*.62;
		}
		
		if(pace > 0){
			$("#errormessage4").fadeOut();
			
			if(d == 6.2){
				pace = (pace/1.15)+35;
			}
			else if(d == 13.1){
				pace = pace = (pace/1.2)+35;;
			}
			else if(d == 26.2){
				pace = pace = (pace/1.3)+35;
			}
			
			var output = "<table class='table table-striped'><thead><th>Workout</th><th>Target Pace</th></thead>";
			
			//Easy Run
			var easy = pace*1.28;
			output = output + "<tr><td>Easy Pace</td><td>"+convertTime(easy)+"</td></tr>";

			//Tempo Run
			var tempo = pace*1.065;
			output = output + "<tr><td>Tempo Pace</td><td>"+convertTime(tempo)+"</td></tr>";
			
			//Maximum Oxygen
			var maxO2 = pace*.96;
			output = output + "<tr><td>Max O2</td><td>"+convertTime(maxO2)+"</td></tr>";
			
			//Speed Form
			var speedform = pace*.89;
			output = output + "<tr><td>Speed Form</td><td>"+convertTime(speedform)+"</td></tr>";
			
			//Long Run
			var longrun = pace*1.28;
			output = output + "<tr><td>Long Run</td><td>"+convertTime(longrun) +" - "+convertTime(longrun+60)+"</td></tr>";
			
			output = output + "</table>";
			
			$("#trainingtimes").html(output);
			$("#trainingtimes").slideDown();	
		}
		else{
			$("#trainingtimes").slideUp();
			$("#errormessage4").fadeIn();	
		}
	}
	
	return false;
}

function racePredictor(form){


	with(form){
		var h = parseFloat(timeh.value);
		var m = parseFloat(timem.value);
		var s = parseFloat(times.value);
		var d = parseFloat(distance.value);
		var measure =  measure.value;
		
		var pace = calculatePace(h, m, s, d, measure);
		
		if(measure.value == "km"){
			d = d*.62;
		}
		
		if(pace > 0){
			$("#errormessage5").fadeOut();
			
			var d1 = d; //distance you already raced
			var t1 = (m*60)+s; //time for the known distance
			if(!isNaN(h)){
				t1 = t1+(h*3600);	
			}
			var d2; //distance you want to predict the time
			var t2; //predicted time for the new distance
			
			var distances = new Array(.5, 1, 3.1, 5, 6.2, 10, 13.1, 26.2);
			var labels = new Array("800m", "1 mile", "5k", "5 mile", "10k", "10 mile", "Half Marathon", "Marathon");
			
			var output = "<table class='table table-striped'><thead><th>Race</th><th>Projected Time</th></thead>";
			
			for(var i=0; i<distances.length; i++){
				d2 = distances[i];
				//t2 = t1 * (d2 / d1)^1.06
				t2 = (d2/d1);
				t2 = Math.pow(t2, 1.06);
				t2 = t2*t1;
				
				output = output + "<tr><td>"+labels[i] +"</td><td>"+ convertTime(t2) + "</td></tr>";
			}
			
			output = output + "</table>";
			
			
			$("#racetimes").html(output);
			$("#racetimes").slideDown();	
		}
		else{
			$("#errormessage5").slideDown();
			$("#racetimes").slideUp();	
		}
	}
	
	return false;
}