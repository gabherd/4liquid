function init()
{
	setInterval('readData();', 10);
}
function readData()
{
	console.log('reading temperatures...');
	//ajax object
	var x = new XMLHttpRequest();
	//open
	x.open('GET','http://localhost:80/Test02Copy/php/data.php', true);
	//send
	x.send();
	//event
	x.onreadystatechange = function() 
	{
		if (x.readyState == 4 && x.status == 200)
		{
			updateChart(x.responseText);
		}
	}
}

function updateChart(data)
{
	var jsonData = JSON.parse(data); 
	if (jsonData.status == 0)
	{
		var temperaturas = jsonData.temperaturas;
		if (temperaturas.length == 10)
		{
			for (var i = 0; i < temperaturas.length; i++)
			{
				var temp = temperaturas[i].temperatura;
				var dateTime = temperaturas[i].hora.toString();
				var time = dateTime;
				//column
				var c = document.getElementById('column' + i);
				var height = temp * 2;
				var y = 90 - height;
				c.style.height = height + '%';
				c.style.y = y + '%';
				c.style.fill = '#009fa6';
				c.style.stroke = '#c1cdcd';
				//value
				var v = document.getElementById('value' + i);
				v.innerHTML = temp + '&deg;';
				v.setAttribute('y',(y - 1) + '%');
				v.style.fill = '#696969';//#537780
				//time
				var t = document.getElementById('time' + i);
				t.innerHTML = time;
			}
	
		}
	}
}
