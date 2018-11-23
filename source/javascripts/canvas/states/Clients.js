import CustomState from './CustomState';

class Clients extends CustomState {
    init(data) {
        this.input.maxPointers = 1;

        // auto pause if window looses focus
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.refresh();

        if (this.game.device.android && this.game.device.chrome == false) {
            this.game.stage.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }

        this.tetris1 = [];
        this.tetris2 = [];
        this.tetris3 = [];
        this.mouseBody = [];
        this.mouseConstraint = [];
    }

    preload() {
        this.game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
        this.game.load.image('tetrisblock2', 'assets/sprites/tetrisblock2.png');
        this.game.load.image('tetrisblock3', 'assets/sprites/tetrisblock3.png');

        this.game.load.physics('physicsData', 'assets/physics/sprites.json');
    }

    create() {

        //  Enable p2 physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;

        this.tetris1 = this.game.add.sprite(300, 100, 'tetrisblock1');
        this.tetris2 = this.game.add.sprite(375, 200, 'tetrisblock2');
        this.tetris3 = this.game.add.sprite(450, 300, 'tetrisblock3');

        //  Create collision group for the blocks
        var blockCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
        //  (which we do) - what this does is adjust the bounds to use its own collision group.
        this.game.physics.p2.updateBoundsCollisionGroup();

        //  Enable the physics bodies on all the sprites
        this.game.physics.p2.enable([tetris1, this.tetris2, this.tetris3], false);

        this.tetris1.body.clearShapes();
        this.tetris1.body.loadPolygon('physicsData', 'tetrisblock1');
        this.tetris1.body.setCollisionGroup(blockCollisionGroup);
        this.tetris1.body.collides([blockCollisionGroup]);

        this.tetris2.body.clearShapes();
        this.tetris2.body.loadPolygon('physicsData', 'tetrisblock2');
        this.tetris2.body.setCollisionGroup(blockCollisionGroup);
        this.tetris2.body.collides([blockCollisionGroup]);

        this.tetris3.body.clearShapes();
        this.tetris3.body.loadPolygon('physicsData', 'tetrisblock3');
        this.tetris3.body.setCollisionGroup(blockCollisionGroup);
        this.tetris3.body.collides([blockCollisionGroup]);

        // create physics body for mouse which we will use for dragging clicked bodies
        mouseBody = new p2.Body();
        this.game.physics.p2.world.addBody(mouseBody);

        // attach pointer events
        this.game.input.onDown.add(click, this);
        this.game.input.onUp.add(release, this);
        this.game.input.addMoveCallback(move, this);
    }

    click(pointer) {

        var bodies = this.game.physics.p2.hitTest(pointer.position, [tetris1.body, this.tetris2.body, this.tetris3.body]);

        // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
        var physicsPos = [game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];

        if (bodies.length) {
            var clickedBody = bodies[0];

            var localPointInBody = [0, 0];
            // this function takes physicsPos and coverts it to the body's local coordinate system
            clickedBody.toLocalFrame(localPointInBody, physicsPos);

            // use a revoluteContraint to attach mouseBody to the clicked body
            mouseConstraint = this.game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), this.game.physics.p2.mpxi(localPointInBody[1])]);
        }

    }

    release() {

        // remove constraint from object's body
        this.game.physics.p2.removeConstraint(mouseConstraint);
    }

    move(pointer) {
        // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
        mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
        mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
    }

    update() {
    }

    render() {

//  this.game.debug.text(result, 32, 32);

    }
}

export default Clients;
