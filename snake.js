    var canvas = document.getElementById('game');
    var score = document.getElementById('score');
    var sc;
    
    var context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = "24px Monospace";
    
    var grid = 16;
    
    var count = 0;
    
    class Snake {
      constructor() { this.reset(); }

      reset() {
        this.x = 160; this.y = 160;
        this.dx = grid; this.dy = 0;
        this.cells = [];
        this.maxCells = 2;
	  }
    }

	var snake = new Snake();
    
    var food = { x: 320, y: 320 };
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

	function placeFood() {
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
	}
    
    function loop() {
      
      requestAnimationFrame(loop);
      
      if (++count < 4) { return; }
      
      count = 0;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      snake.x += snake.dx;
      snake.y += snake.dy;
      
      if (snake.x < 0) {
        snake.x = canvas.width - grid;
      }
      else if (snake.x >= canvas.width) {
        snake.x = 0;
      }
      
      if (snake.y < 0) {
        snake.y = canvas.height - grid;
      }
      else if (snake.y >= canvas.height) {
        snake.y = 0;
      }

      snake.cells.unshift({ x: snake.x, y: snake.y });
      
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }
      
      context.fillRect(food.x, food.y, grid, grid);
      context.fillText("Score: " + (snake.maxCells - 2), 10, 24);
//      score.innerText = 'Score: ' + (snake.maxCells - 2);
      
      
      snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid, grid);
        
        if (cell.x === food.x && cell.y === food.y) {
          snake.maxCells++;
          placeFood();     
        }
        
        for (var i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.reset();
            placeFood();     
          }
        }
      });
    }
    
    document.addEventListener('keydown', function (e) {
      if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      }
      else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }
      else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      }
      else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    });
    
    requestAnimationFrame(loop);
