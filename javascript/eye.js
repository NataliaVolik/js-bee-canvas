function Eye(context, radius, x, y, pupilRadius) {
  var self = this;
  self.radius = radius;
  self.x = x;
  self.y = y;
  self.pupilRadius = pupilRadius;
  self.ctx = context;

  self.draw = function (position) {
    self.ctx.beginPath();
    self.ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 2, true);
    self.ctx.stroke();
    self.ctx.fillStyle = "#ffffff";
    self.ctx.fill();
    self.ctx.closePath();

    //draw pupil
    self.ctx.beginPath();
    switch (position) {
      case "left":
        self.ctx.arc(self.x - self.radius + self.pupilRadius, self.y, self.pupilRadius, 0, Math.PI * 2, true);
        break;
      case "right":
        self.ctx.arc(self.x + self.radius - self.pupilRadius, self.y, self.pupilRadius, 0, Math.PI * 2, true);
        break;
      case "up":
        self.ctx.arc(self.x, self.y - self.radius + self.pupilRadius, self.pupilRadius, 0, Math.PI * 2, true);
        break;
      case "down":
        self.ctx.arc(self.x, self.y + self.radius - self.pupilRadius, self.pupilRadius, 0, Math.PI * 2, true);
        break;
      default:
        self.ctx.arc(self.x, self.y, self.pupilRadius, 0, Math.PI * 2, true);
    }

    self.ctx.fillStyle = "#000000";
    self.ctx.fill();
    self.ctx.closePath();

  }
}