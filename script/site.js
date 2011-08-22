$(function() {
// forked from minikomi's "With gravity forked from: Confetti bomb forked from: recursive splat 1" http://jsdo.it/minikomi/AaVL
// forked from minikomi's "Confetti bomb forked from: recursive splat 1" http://jsdo.it/minikomi/sd1t
  var FRAMERATE, GRAVITY, NUMNODES, animate, animation, canvas, create, ctx, everse, move, node, nodearray = [], i;
  FRAMERATE = 1000 / 30 >> 0;
  GRAVITY = 12 / FRAMERATE;
  NUMNODES = 1000;

  canvas = document.getElementById("world");
  ctx = canvas.getContext("2d");

  ctx.Style = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, 445, 445);

  node =  {
    init: function(xp, yp){
            this.xpos = parseInt(xp + (Math.floor((Math.random() * 80) - 20)), 10);
            this.ypos = parseInt(yp + (Math.floor((Math.random() * 80) - 20)), 10);  

            var dx = 0;
            var dy = 0;
            while (dx === 0 && dy === 0) {
              dx = (Math.random() * 10) - 5;
              dy = (Math.random() * 10) - 5;
            }
            this.dx = dx;
            this.dy = dy;
            this.r = Math.floor((Math.random()*255));
            this.g = Math.floor((Math.random()*255));
            this.b = Math.floor((Math.random()*255));
            this.alpha = 1;
          },
    move: function(){
          var xpos, ypos, xwobble, ywobble;

          xpos = this.xpos;
          ypos = this.ypos;
 
          
          xwobble = Math.random()*-2;
          ywobble = Math.random()*3-1;
          this.dy = this.dy + GRAVITY;
          xpos = xpos + this.dx;
          ypos = ypos + this.dy;
          xpos = xpos > 443 ? 443 : xpos;
          ypos = ypos > 443 ? 443 : ypos;
          xpos = xpos < 0 ? 0 : xpos;
          ypos = ypos < 4 ? 0 : ypos;
          this.xpos = xpos;
          this.ypos = ypos;


          if (ypos <= 2 || ypos >= 443){this.dy = -this.dy + 5 + ywobble;}
                if (xpos <= 2){this.dx = -this.dx + xwobble;}
          else if (xpos >= 443){this.dx = -this.dx - xwobble;}
      
          
          this.alpha = this.alpha - 0.01;
    
          }

  };

  animate = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 460, 460);

    _.each(nodearray, function(node){
    node.move();
    ctx.fillStyle = "rgba("+node.r+","+node.g+","+node.b+","+node.alpha+")";
    ctx.beginPath();
    ctx.rect(node.xpos, node.ypos, 3, 6);
    ctx.fill();
    ctx.closePath();
    }); 
    if (nodearray[0].alpha <= 0){clearInterval(animation);}
  };

  $("canvas").click(function(e){
  e.preventDefault();

  clearInterval(animation);

  offsetx = (window.event.x-this.offsetTop);
  offsety = (window.event.y-this.offsetTop);
   
  _.each(nodearray, function(node){node.init(offsetx, offsety);});
               
  animation = setInterval(animate, FRAMERATE);

  });

  for(i=0; i < NUMNODES; i++){
   nodearray[i] = Object.create(node);
  }
});
