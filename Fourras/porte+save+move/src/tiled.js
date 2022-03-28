class tiled {
    constructor(scene) {
        this.scene=scene
    }
    createtiled() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        this.platforms.setCollisionByExclusion(-1, true);
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

// Let's get the spike objects, these are NOT sprites
// We'll create spikes in our sprite group for each object in our map
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
            spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
        });
        this.physics.add.collider(this.player.player, this.spikes, playerHit, null, this);

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

// Let's get the save objects, these are NOT sprites
// We'll create saves in our sprite group for each object in our map
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y + 200 - save.height, 'save').setOrigin(0);
        });
        this.physics.add.overlap(this.player.player, this.saves, sauvegarde,null, this)

        this.moves = this.physics.add.group({
            allowGravity: false,
            immovable: false
        });

// Let's get the move objects, these are NOT sprites
// We'll create moves in our sprite group for each object in our map

        map.getObjectLayer('Mouvable').objects.forEach((move) => {
            const moveSprite = this.moves.create(move.x, move.y + 200 - move.height, 'move').setOrigin(0);
        });
        this.physics.add.collider(this.player.player, this.moves, pousser,null, this)
        this.physics.add.collider(this.moves,this.moves)
    }

}

create()
{
    super.create();

    // Création de tout les emmiters
    //Luciole1
    this.configFX1 = {
        rotate: {min: 0, max: 360},
        scale: {start: 0.2, end: 0.1},
        alpha: {start: 1, end: 0},
        blendMode: Phaser.BlendModes.ADD,
        speed: 12
    };
    //Luciole2
    this.configFX2 = {
        angle: {min: 180, max: 360},
        speed: 150,
        gravityY: 350,
        lifespan: 150,
        quantity: 3,
        scale: {start: 0.1, end: 0.2},
        blendMode: 'ADD'
    };
    //Luciole3
    this.configFX3 = {
        lifespan: {min: 120, max: 180},
        angle: {start: 0, end: 360, steps: 64},
        speed: 80,
        quantity: 16,
        scale: {start: 0.2, end: 0.1},
        frequency: 32,
        blendMode: 'ADD'
    };
    //Luciole4
    this.configFX4 = {
        lifespan: 250,
        angle: {start: 360, end: 0, steps: 32},
        speed: 100,
        scale: {start: 0.2, end: 0},
        frequency: 40,
        blendMode: 'ADD'
    };




    this.luciole1 = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });

    map.getObjectLayer('Luciole1').objects.forEach((luciole1) => {
        this.luciole1Sprite = this.luciole1.create(luciole1.x, luciole1.y + 200 - luciole1.height, 'luciole1');
        this.luciole1SpriteFX = this.add.particles('luciole1')//On charge les particules à appliquer au layer
        this.luciole1SpriteFX.createEmitter(this.configFX1)
        this.luciole1SpriteFX.x = this.luciole1Sprite.x
        this.luciole1SpriteFX.y = this.luciole1Sprite.y
    });



    this.luciole2 = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });


    map.getObjectLayer('Luciole2').objects.forEach((luciole2) => {
        this.luciole2Sprite = this.luciole2.create(luciole2.x, luciole2.y + 200 - luciole2.height, 'luciole2');
        this.luciole2SpriteFX = this.add.particles('luciole2')//On charge les particules à appliquer au layer
        this.luciole2SpriteFX.createEmitter(this.configFX2)
        this.luciole2SpriteFX.x = this.luciole2Sprite.x
        this.luciole2SpriteFX.y = this.luciole2Sprite.y
    });

    this.luciole3 = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });

    map.getObjectLayer('Luciole3').objects.forEach((luciole3) => {
        this.luciole3Sprite = this.luciole3.create(luciole3.x, luciole3.y + 200 - luciole3.height, 'luciole3');
        this.luciole3SpriteFX = this.add.particles('luciole3')//On charge les particules à appliquer au layer
        this.luciole3SpriteFX.createEmitter(this.configFX3)
        this.luciole3SpriteFX.x = this.luciole3Sprite.x
        this.luciole3SpriteFX.y = this.luciole3Sprite.y
    });

    this.luciole4 = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });
}