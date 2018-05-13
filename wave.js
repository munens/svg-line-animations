var frequency = 2;
var amplitude = 0.1;
var frameRate = 60;
var increment = 1;
var offSet = 0;

var line = document.getElementById(`sine-wave`);

var pathFunction = function (x, offSet) {
  return (Math.sin( 
    Math.sqrt(x * frequency) - offSet
  )) * x * (0.1 * amplitude);
}

SVGPathElement.prototype.setPathData = function (pathData) {
  var d = '';
  for (var i = 0; i < pathData.length; i++) {
    var seg = pathData[i];
    if (i > 0) {
      d += ' ';
    }

    d += seg.type;
    d += ' ' + seg.values.join(' ');
  }

  this.setAttribute('d', d);
}

var createGraphPath = function(line, offSet) {
  var x = 0;
  var data = [
    {
      'type': 'M',
      'values': [0, 150]
    }
  ];
  while (x < 1000) {
    var point = {
      x: x,
      y: 150 - pathFunction(x, offSet)
    };
    data.push({
      'type': 'L',
      'values': [
        point.x, 
        point.y
      ]
    });
    //console.log(data);
    x+=1;
  }

  line.setPathData(data)
};

var animateGraph = function (arguments) {
  offSet += (increment / frameRate);
  createGraphPath(line, offSet)
  setTimeout(function() {
    requestAnimationFrame(animateGraph)
  }, 1000 / frameRate);
}

requestAnimationFrame(animateGraph);



/*var app = angular.module('waveApp', []);

app.controller('waveCtrl', function($scope) {
	
	var path = $('.sine-wave');
	var reference = $('.sine-wave-reference');

	$scope.x = 0;
	$scope.offset = 0;
	
	$scope.pathFunction = function (x) {
		var result = 
			
			// Function to determine curve
			// 0.2*(Math.sin(Math.sqrt(x)-$scope.offset))*x;
			(Math.sin(Math.sqrt(x*$scope.frequency)-$scope.offset))*x*(0.1 * $scope.amplitude);
		
		return result;
	};
	
	$scope.createGraph = function (wave) {
		$scope.x = 0;
		var data = [
			{
				'type': 'M',
				'values': [0,150]
			}
		];
		while ($scope.x < 300) {
			point = {
				x: $scope.x,
				y: 150 - $scope.pathFunction($scope.x) 
			};
			data.push({
				'type': 'L',
				'values': [
					point.x,
					point.y
				]
			});
			$scope.x += 1;
		}
		wave[0].setPathData(data);
	};
	
	$scope.createGraph(reference);
	
	$scope.updateGraph = function () {
		$scope.createGraph(reference);
	};
	
	$scope.play = true;

	$scope.animate = function () {
		if ($scope.play === true) {
			$scope.offset += ($scope.increment / $scope.framerate);
			$scope.createGraph(path);
			setTimeout(function () {
				requestAnimationFrame($scope.animate);	
			},(1000 / $scope.framerate));
		}
	}
	requestAnimationFrame($scope.animate);

});
*/







