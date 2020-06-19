class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 向量的模
    // this.length = this.getLength();
    // 单位向量
    // this.unitVector = this.getUnitVector();
    // 法向量
    // this.normalVector = this.getNormalVector();
  }
  getLength() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  plus(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  minus(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  // 点积
  dotProduct(v) {
    return this.x * v.x + this.y * v.y;
  }
  getPerpendicularVector() {
    return new Vector(this.y, -this.x);
  }
  getUnitVector() {
    const l = this.getLength();
    
    return new Vector(this.x / l, this.y / l);
  }
  getNormalVector() {
    return this.getPerpendicularVector().getUnitVector();
  }
}

class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
  isOverlapsWith(anotherProjection) {
    return this.max > anotherProjection.min && anotherProjection.max > this.min;
  }
}

export class Polygon {
  constructor(points, ctx) {
    this.points = points;
    this.ctx = ctx;
  }
  // 获取多边形的边向量
  getLineVectors() {
    const temp =  this.points.map(({ x, y }, index) => {
      const nextIndex = (index + 1) % this.points.length;
      const nextPoint = this.points[nextIndex];
      const v1 = new Vector(x, y);
      const v2 = new Vector(nextPoint.x, nextPoint.y);
      const lineVector = v1.minus(v2);
      return lineVector;
    });
    return temp;
  }
  getProjectAxes() {
    // 边的单位向量作为投影的方向
    // 其他向量和它的点积就是其他向量在这个轴上投影的长度
    return this.getLineVectors().map(v => v.getUnitVector());
  }
  // 当前多边行在某一方向上的投影
  getProjection(projectVector) {
    const projectionLength = this.points.map(({ x, y }) => {
      return new Vector(x, y).dotProduct(projectVector);
    });
    return new Projection(
      Math.min(...projectionLength),
      Math.max(...projectionLength)
    );
  }
  // 两个多边形在所有轴方向上的投影都重叠则为碰撞
  isCollidesWith(shape) {
    const projectAxes = [
      ...this.getProjectAxes(),
      ...shape.getProjectAxes()
    ];
    for (let i = 0; i < projectAxes.length; i++) {
      let axis = projectAxes[i];
      const currentProjection = this.getProjection(axis);
      const anotherProjection = shape.getProjection(axis);
      if (!currentProjection.isOverlapsWith(anotherProjection)) {
        return false;
      }
    }
    return true;
  }
  move(dx, dy) {
    this.points = this.points.map(({x, y}) => ({
      x: x + dx,
      y: y + dy
    }));
  }
  draw() {
    this.ctx.save();

    if(this.points.length === 0) {
        return
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    for(var i = 0, len = this.points.length; i < len; i++) {
        this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();

  }
}
export class Round {
  constructor(x, y, radiusX, radiusY, ctx) {
    this.x = x;
    this.y = y;
    this.radius = Math.max(radiusX, radiusY);

    this.ctx = ctx;
  }

  getProjectAxes() {
    return [];
  }

  getProjection(projectVector) {
    const projectionLength = new Vector(this.x, this.y).dotProduct(projectVector);

    return new Projection(
      projectionLength - this.radius,
      projectionLength + this.radius
    );
  }
  
  isCollidesWith(shape) {
    if (shape instanceof Polygon) {
      return shape.isCollidesWith(this);
    }
    if (shape instanceof Round) {
      const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2))
      return distance < Math.abs(this.radius + shape.radius);
    }
    return false;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }
  
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export const shapeTypesEnum = {
  POLYGON: 'POLYGON',
  ROUND: 'ROUND'
};