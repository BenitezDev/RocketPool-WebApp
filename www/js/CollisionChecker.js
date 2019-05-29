

// Detect collision between circles
function CheckCollisionBetweenCircles(pos1, r1, pos2, r2) {

    let dx = pos2.x - pos1.x;
    let dy = pos2.y - pos1.y;
    let r = r1 + r2;

    return ((dx * dx + dy * dy) <= r * r);
}


function PointInsideRectangle(point, rectangle) {

    return point.x >= (rectangle.position.x) &&
        point.x <= (rectangle.position.x + rectangle.width) &&
        point.y >= (rectangle.position.y) &&
        point.y <= (rectangle.position.y + rectangle.height);
}

function CircleInsideCircle(C, R, c, r) {
    let sqrDistanceCc = (C.x - c.x) * (C.x - c.x) + (C.y - c.y) * (C.y - c.y);

    return sqrDistanceCc <= Math.abs((R - r) * (R - r));
}


// function OnContactDetected(contact) {
//     //console.table(contact)
//     var a = contact.GetFixtureA().GetBody().GetUserData();
//     var b = contact.GetFixtureB().GetBody().GetUserData();

//     // car and wall
//     if (a == null && b == null) {
//         console.log("nada toca con nada");
//         return;
//     }

//     if ((typeof (a.type) === 'ball' && typeof (b.type) === 'ball') &&
//         (a != null && b != null)) {
//         // audio.balls_collide.play();
//         // audioManager.playFx(audio.balls_collide, 0);
//         audioManager.playFx(audio.hit, 0);

//     }

// }

function OnContactDetected(contact) {
    //console.table(contact)
    var a = contact.GetFixtureA().GetBody().GetUserData();
    var b = contact.GetFixtureB().GetBody().GetUserData();

    // car and wall
    if ((a != null && b != null)) {

        // Max linear velocity |12.5|



        // Ball and Ball
        if (a.type === 'ball' && b.type === 'ball') {

            if (a.owner) {
                b.owner = a.owner;
            } else {
                b.owner = null;
            }

            let maxA = Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().y);
            let maxB = Math.abs(contact.GetFixtureB().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureB().GetBody().GetLinearVelocity().y);

            audioManager.playFx(audio.balls_collide, Clamp((Math.max(maxA, maxB) / 12.5), 0, 1));

            console.log("BOLAS: " + a.img.src + " and " + b.img.src);
        }

        // Ball and Wall
        if (a.type === 'wall' && b.type === 'ball') {


            let max = Math.abs(contact.GetFixtureB().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureB().GetBody().GetLinearVelocity().y);

            audioManager.playFx(audio.table_hit, Clamp(max / 12.5, 0, 0.5)); // Max volume is half max audio

        }

        // Car and Wall
        if (a.type === 'car' && b.type === 'wall') {


            let max = Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().y);

            audioManager.playFx(audio.hit, Clamp(max / 12.5, 0, 0.2)); // Max volume is 0.2 max audio

        }

        // Cars
        if (a.type === 'car' && b.type === 'car') {


            let max = Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().y);

            audioManager.playFx(audio.hit, Clamp(max / 12.5, 0, 0.2)); // Max volume is 0.2 max audio

        }

        // Car and Ball
        if (a.type === 'car' && b.type === 'ball') {

            b.owner = a.owner;
            console.log(b.owner + "----" + a.owner);

            let max = Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().x) + Math.abs(contact.GetFixtureA().GetBody().GetLinearVelocity().y);

            audioManager.playFx(audio.strike, Clamp(max / 12.5, 0, 1)); // Max volume is 0.2 max audio

        }

    }

}


function Clamp(num, min, max) {
    return Math.max(min, Math.min(num, max));
}