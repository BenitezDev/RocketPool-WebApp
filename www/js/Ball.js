//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//



function Ball(img, pos, ori, radius, scale) {

    // Collider tag
    this.type = 'ball';

    if (!pos) pos = new Vector2();
    this.position = pos;

    if (!ori) ori = new Vector2();
    this.origin = ori;

    this.radius = radius;

    this.img = img;
    this.scale = scale;

    // Physics properties
    let defaultOptions = {
        density: 1,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 0.05,
        angularDamping: 0.05,

        type: b2Body.b2_dynamicBody
    };

    // Fixture: define physics propierties (density, friction, restitution)
    this.fix_def = new b2FixtureDef();
    this.fix_def.density = defaultOptions.density;
    this.fix_def.friction = defaultOptions.friction;
    this.fix_def.restitution = defaultOptions.restitution;

    // Shape: 2d geometry
    this.fix_def.shape = new b2CircleShape(radius * this.scale);

    // Body: position of the object and its type (dynamic, static o kinetic)
    this.body = new b2BodyDef();
    this.body.position.Set(this.position.x, this.position.y);

    this.body.linearDamping = defaultOptions.linearDamping;
    this.body.angularDamping = defaultOptions.angularDamping;

    this.body.type = defaultOptions.type; // type: b2_dynamicBody
    this.body.userData = defaultOptions.user_data;

    this.collider = PoolGame.world.CreateBody(this.body);
    this.fixture = this.collider.CreateFixture(this.fix_def);

    this.owner = null;

}


Ball.prototype.update = function () {

    this.position.x = this.fixture.GetBody().GetPosition().x;
    this.position.y = this.fixture.GetBody().GetPosition().y;
    this.angle = this.fixture.GetBody().GetAngle();

}


Ball.prototype.draw = function () {

    Canvas.drawImage(this.img, this.position, this.angle, this.scale, this.origin);

}
