function Eyes(canvas, context, radius, x, y, pupilRadius) {
  var self = this;
  self.ctx = context;
  self.radius = radius;
  self.x = x;
  self.y = y;
  self.pupilRadius = pupilRadius;
  self.mouseX = 0;
  self.mouseY = 0;
  self.canvas = canvas;
  self.isOpen = true;
  self.openEyesCounter = 0;

  self.openCloseHandler = function () {
    if (self.isOpen) {
      self.openEyesCounter++;
      if (self.openEyesCounter > 3) {
        self.isOpen = !self.isOpen;
        self.openEyesCounter = 0;
      }
    } else {
      self.isOpen = !self.isOpen;
    }
  };

  (function loop() {
    var rand = randomInteger(500, 2000);
    setTimeout(function () {
      self.openCloseHandler(self);
      loop();
    }, rand);
  }());


  self.isMouseAtBottom = function () {
    var eyeLeftBottomCornerPosY = self.y + 2 * self.radius;
    if ((self.canvas.height >= self.mouseY && eyeLeftBottomCornerPosY <= self.mouseY) &&
      (self.mouseX >= 0 && self.mouseX <= self.canvas.width)) {
      return true;
    }
    return false;
  };

  self.isMouseAtTop = function () {
    if ((self.mouseX >= 0 && self.mouseX <= self.canvas.width) &&
      (self.y >= self.mouseY && self.mouseY >= 0)) {
      return true;
    }
    return false;
  };

  self.isMouseAtLeft = function () {
    if ((self.mouseY >= self.y && self.mouseY <= self.y + 2 * self.radius) &&
      (self.mouseX >= 0 && self.mouseX <= self.x)) {
      return true;
    }
    return false;
  };

  self.isMouseAtRight = function () {
    if ((self.mouseY <= self.y + 2 * self.radius && self.mouseY >= self.y) &&
      (self.mouseX >= self.x + 4 * self.radius && self.mouseX <= self.canvas.width)) {
      return true;
    }
    return false;
  };


  self.pupilPosition = function () {
    switch (true) {
      case self.isMouseAtLeft():
        return 'left';
        break;
      case self.isMouseAtRight():
        return 'right';
        break;
      case self.isMouseAtBottom():
        return 'down';
        break;
      case self.isMouseAtTop():
        return 'up';
        break;
      default:
        return 'center'
    }
  };


  self.draw = function (mouseX, mouseY) {
    self.mouseX = mouseX;
    self.mouseY = mouseY;

    if (!self.isOpen) {
      return;
    }

    var position = self.pupilPosition();

    var left = new Eye(self.ctx, self.radius, self.x + self.radius, self.y + self.radius, self.pupilRadius);
    left.draw(position);

    var right = new Eye(self.ctx, self.radius, self.x + self.radius * 3, self.y + self.radius, self.pupilRadius);
    right.draw(position);

  };

}