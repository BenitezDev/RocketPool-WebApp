function Car(img, pos, player, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, lookAt) {

    this.img = img;
    this.wheelImg = sprites.wheel;
    this.scale = 0.15;
    this.angle = 90;
    this.position = pos;

    this.owner = player;
    // Car movement inputs
    this.KEY_LEFT = KEY_LEFT;
    this.KEY_RIGHT = KEY_RIGHT;
    this.KEY_UP = KEY_UP;
    this.KEY_DOWN = KEY_DOWN;

    this.lookAt = lookAt;

    // Car Physics
    this.body = null;
    this.speed = 5;
    this.maxSpeed = 300000;
    this.engineOn = false;
    this.gear = 1; // gear (-1: forward, 1: backward)
    this.wheelRotationSpeed = 1;
    this.wheelRelocationSpeed = 0.5;

    // Front Wheels
    this.frontLeftWheel = null;
    this.frontRightWheel = null;

    // Rear Wheels
    this.rearLeftWheel = null;
    this.rearRightWheel = null;

    // Wheels packs
    this.frontWheels = [];
    this.rearWheels = [];

    this.wheels = [];

    // Joints
    this.frontJoint = null;
    this.rearJoint = null;


    // Mobile Inputs
    this.pressingForward = false;
    this.pressingBackward = false;
    this.pressingLeft = false;
    this.pressingRight = false;

    this.start();

}

Car.prototype.start = function () {

    // Collider tag
    this.type = 'car';

    // Chassis
    let chassisOptions = {
        density: 1,
        friction: 1.0,
        restitution: 1,

        linearDamping: 0.1,
        angularDamping: 50,

        type: b2Body.b2_dynamicBody
    };
    this.body = CreateBox(PoolGame.world, this.position.x, this.position.y, 12, 35, chassisOptions);

    // Wheels
    let frontWheelsOptions = {
        density: 1,
        friction: 1.0,
        restitution: 1,

        linearDamping: 1,
        angularDamping: 10.0,

        type: b2Body.b2_dynamicBody
    };
    let rearWheelsOptions = {
        density: 1000,
        friction: 5,
        restitution: 0,

        linearDamping: 0.5,
        angularDamping: 3,

        type: b2Body.b2_dynamicBody
    };
    if (this.lookAt == 'right') {
        this.frontLeftWheel = CreateBox(PoolGame.world, this.position.x + 17, this.position.y - 14, 3, 6, frontWheelsOptions);
        this.frontRightWheel = CreateBox(PoolGame.world, this.position.x + 17, this.position.y + 14, 3, 6, frontWheelsOptions);

        this.rearLeftWheel = CreateBox(PoolGame.world, this.position.x - 13, this.position.y + 8, 3, 10, rearWheelsOptions);
        this.rearRightWheel = CreateBox(PoolGame.world, this.position.x - 13, this.position.y - 8, 3, 10, rearWheelsOptions);
    } else if (this.lookAt == 'left') {

        this.frontLeftWheel = CreateBox(PoolGame.world, this.position.x - 17, this.position.y + 14, 3, 6, frontWheelsOptions);
        this.frontRightWheel = CreateBox(PoolGame.world, this.position.x - 17, this.position.y - 14, 3, 6, frontWheelsOptions);

        this.rearLeftWheel = CreateBox(PoolGame.world, this.position.x + 13, this.position.y - 8, 3, 10, rearWheelsOptions);
        this.rearRightWheel = CreateBox(PoolGame.world, this.position.x + 13, this.position.y + 8, 3, 10, rearWheelsOptions);
    }

    this.wheels.push(this.frontLeftWheel);
    this.wheels.push(this.frontRightWheel);
    this.wheels.push(this.rearLeftWheel);
    this.wheels.push(this.rearRightWheel);

    this.frontWheels.push(this.frontLeftWheel);
    this.frontWheels.push(this.frontRightWheel);

    this.rearWheels.push(this.rearLeftWheel);
    this.rearWheels.push(this.rearRightWheel);

    // Rotate the car to look right
    if (this.lookAt == 'right')
        this.body.SetAngle(Math.PI / 2);
    else if (this.lookAt == 'left')
        this.body.SetAngle(Math.PI * 270 / 180);


    this.wheels.forEach(wheel => { wheel.SetAngle(Math.PI / 2); });

    //  Initialize front wheels
    for (let i in this.frontWheels) {
        let wheel = this.frontWheels[i];
        let jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
        // wheel maximum steering angle
        jointDef.lowerAngle = -Math.PI / 4; // -45 degrees
        jointDef.upperAngle = Math.PI / 4; // 45 degrees
        jointDef.enableLimit = true;
        jointDef.maxMotorTorque = 3000000.0;
        jointDef.enableMotor = true;
        this.frontWheels[i].joint = world.CreateJoint(jointDef);
        console.log("---------"+this.frontWheels[i].joint);
    }

    // Initialize rear wheels
    for (let i in this.rearWheels) {
        let jointDef = new b2PrismaticJointDef();
        let x = true;
        let center = new Vector2(this.rearWheels[i].GetWorldCenter().x, this.rearWheels[i].GetWorldCenter().y);;
        jointDef.Initialize(this.body, this.rearWheels[i], center, new b2Vec2(1, 0));
        jointDef.enableLimit = true;

        jointDef.enableMotor = true;
        this.rearWheels[i].joint = world.CreateJoint(jointDef);
    }


}

Car.prototype.update = function () {

    //Calculate wheel rotation
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;

    if (input.isKeyPressed(this.KEY_LEFT) || this.pressingLeft) {
        wheelAngle += this.frontLeftWheel.joint.m_lowerAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }
    if (input.isKeyPressed(this.KEY_RIGHT) || this.pressingRight) {
        wheelAngle += this.frontLeftWheel.joint.m_upperAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }

    if (!(input.isKeyPressed(this.KEY_LEFT) || input.isKeyPressed(this.KEY_RIGHT) || this.pressingLeft || this.pressingRight)) {
        wheelAngle = 0.0;
        wheelRotationSpeed = this.wheelRotationSpeed * this.wheelRelocationSpeed;
    }
    // Calculate movement
    if (!input.isKeyPressed(this.KEY_UP) && !input.isKeyPressed(this.KEY_DOWN) && !this.pressingForward && !this.pressingBackward) {
        this.stopEngine();
    }
    if (input.isKeyPressed(this.KEY_UP) || this.pressingForward) {

        this.gear = this.lookAt == 'right' ? -1 : 1;
        //this.gear = -1;
        this.startEngine();
    }
    else if (input.isKeyPressed(this.KEY_DOWN) || this.pressingBackward) {
        this.gear = this.lookAt == 'right' ? 1 : -1;
        //this.gear = 1;
        this.startEngine();
    }

    // Apply rotation
    for (let i in this.frontWheels) {
        let wheelJoint = this.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }

    // Apply motor movement of the wheels. Four-wheel drive
    for (let i in this.wheels) {
        var direction = this.wheels[i].GetTransform().R.col2.Copy();
        direction.Multiply(this.speed);
        this.wheels[i].ApplyForce(direction, this.wheels[i].GetPosition());
    }

}

Car.prototype.moveLeft = function(car){
    
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;
    wheelAngle += car.frontLeftWheel.joint.m_lowerAngle;
    wheelRotationSpeed = car.wheelRotationSpeed;
     // Apply rotation
     for (let i in car.frontWheels) {
        let wheelJoint = car.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }
}

Car.prototype.moveRight = function(car){
    
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;
    wheelAngle += car.frontLeftWheel.joint.m_upperAngle;
    wheelRotationSpeed = car.wheelRotationSpeed;
     // Apply rotation
     for (let i in car.frontWheels) {
        let wheelJoint = car.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }

}

Car.prototype.moveForward = function(car){
    car.gear = car.lookAt == 'right' ? -1 : 1;
    //this.gear = -1;
    car.startEngine();
    // Apply motor movement of the wheels. Four-wheel drive
    for (let i in car.wheels) {
        var direction = car.wheels[i].GetTransform().R.col2.Copy();
        direction.Multiply(car.speed);
        car.wheels[i].ApplyForce(direction, car.wheels[i].GetPosition());
    }
}

Car.prototype.moveBackward = function(car){
    this.gear = this.lookAt == 'right' ? 1 : -1;
    //this.gear = 1;
    this.startEngine();
   // Apply motor movement of the wheels. Four-wheel drive
   for (let i in car.wheels) {
    var direction = car.wheels[i].GetTransform().R.col2.Copy();
    direction.Multiply(car.speed);
    car.wheels[i].ApplyForce(direction, car.wheels[i].GetPosition());
} 
}

Car.prototype.draw = function () {

    // 1º Draw wheels
    this.frontWheels.forEach(wheel => {
        Canvas.drawImage(this.wheelImg, wheel.GetPosition(), wheel.GetAngle(), this.scale, { x: this.wheelImg.width / 2, y: this.wheelImg.height / 2 });
    });

    // 2º Draw chassis
    Canvas.drawImage(this.img, this.body.GetPosition(), this.body.GetAngle(), this.scale, { x: this.img.width / 2, y: this.img.height / 2 });
}

Car.prototype.startEngine = function () {

    this.engineOn = true;
    this.speed = this.gear * this.maxSpeed;

}

Car.prototype.stopEngine = function () {

    this.engineOn = false;
    this.speed = 0;

}