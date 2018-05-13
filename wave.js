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
      y: (Math.sin(increment - 0.07 * x) + 150) - pathFunction(x, offSet)
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