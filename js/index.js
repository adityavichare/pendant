      var imagesArray = ["http://pngimg.com/uploads/necklace/necklace_PNG31.png", "https://media.jewelfeed.com/catalog/items/fcd91cee-9835-44b9-b31e-6fdedd4f3540.png","http://pngimg.com/uploads/necklace/necklace_PNG31.png", "https://unixtitan.net/images/bling-transparent-2.png", "https://media.jewelfeed.com/catalog/items/fcd91cee-9835-44b9-b31e-6fdedd4f3540.png.350x350_q85_background.png"];
      var heartsOutside = ["","","","","","","",""]
      var HeartsBackground = {
                heartHeight: 100,
                heartWidth: 100,
                hearts: [],
                heartImage: 'https://media.jewelfeed.com/catalog/items/fcd91cee-9835-44b9-b31e-6fdedd4f3540.png.350x350_q85_background.png',
                maxHearts: 30,
                minScale: 0.4,
                draw: function() {
                  this.setCanvasSize();
                  this.ctx.clearRect(0, 0, this.w, this.h);
                  for (var i = 0; i < this.hearts.length; i++) {
                    
                    
                    //else{
                    var num = Math.floor(Math.random() * 3); // 0...4
                    if(heartsOutside[i] != ""){num = heartsOutside[i]}
                    var heart = this.hearts[i];
                    heartsOutside[i] = num;
                    heart.image = new Image();
                    heart.image.style.height = heart.height;
                    
                    heart.image.src = imagesArray[num];
                    this.ctx.globalAlpha = heart.opacity;
                    this.ctx.drawImage (heart.image, heart.x, heart.y, heart.width, heart.height);
                  }
          this.move();
        },
        move: function() {
          for(var b = 0; b < this.hearts.length; b++) {
            var heart = this.hearts[b];
            heart.y += heart.ys;
            if(heart.y > this.h) {
              heart.x = Math.random() * this.w;
              heart.y = -1 * this.heartHeight;
              heartsOutside[b] = ""
            }
          }
        },
        setCanvasSize: function() {
          this.canvas.width = window.innerWidth;
          this.canvas.height = 180;
          this.w = this.canvas.width;
          this.h = this.canvas.height;
        },
        initialize: function() {
          this.canvas = $('#canvas')[0];

          if(!this.canvas.getContext)
            return;

          this.setCanvasSize();
          this.ctx = this.canvas.getContext('2d');

          for(var a = 0; a < this.maxHearts; a++) {
            var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
            this.hearts.push({
              x: Math.random() * this.w,
              y: Math.random() * this.h,
              ys: Math.random() + 1,
              
              height: scale * this.heartHeight,
              width: scale * this.heartWidth,
              opacity: scale,
              image: imagesArray[Math.floor(Math.random()*imagesArray.length)]
            });
          }

          setInterval($.proxy(this.draw, this), 30);
        }
      };

      $(document).ready(function(){
        HeartsBackground.initialize();
      });