var Bee = function (canvas, ctx, x, y, width, frames, spritePath, trajectory) {
  var self = this;
  self.canvas = canvas;
  self.ctx = ctx;
  self.x = x;
  self.y = y;
  self.originalX = x;
  self.originalY = y;
  self.width = width;
  self.frames = frames;
  self.currentFrame = 0;
  self.step = 1;
  self.direction = -1;
  self.image = new Image();
  self.image.src = spritePath;
  self.trajectory = {
    speed: 1, //x times slower then now 1 -is fastest, 2 - slower
    speedCounter: 0,
    points: trajectory,
    position: 0,
    firstTimeMove: true
  };

  self.draw = function () {
    if (self.currentFrame == self.frames - 1 || self.currentFrame == 0) {
      self.direction = self.direction * -1;
    }
    self.currentFrame = self.currentFrame + (self.step * self.direction);

    self.ctx.drawImage(
      self.image, // image object
      self.width * self.currentFrame, // x top left corner of the sub-rectangle of the source image
      0, // y top left corner of the sub-rectangle of the source image
      self.width, // width of the sub-rectangle of the source image
      self.width, // height of the sub-rectangle of the source image
      self.x, // x canvas
      self.y, // y canvas
      self.width, // width canvas
      self.width // height canvas
    );

    self.move();
  };

  self.move = function () {
    if (self.trajectory.firstTimeMove) {
      self.trajectory.position = randomInteger(0, self.trajectory.points.length - 1);
      self.trajectory.firstTimeMove = false;
    }

    if (self.trajectory.position == (self.trajectory.points.length - 1)) {
      self.trajectory.position = 0;
    }

    if (self.trajectory.speedCounter < self.trajectory.speed) {
      self.trajectory.speedCounter++;
      return;
    } else {
      self.trajectory.speedCounter = 0;
    }


    self.x = self.trajectory.points[self.trajectory.position][0] + self.originalX;
    self.y = self.trajectory.points[self.trajectory.position][1] + self.originalY;

    ++self.trajectory.position;
  };
};
