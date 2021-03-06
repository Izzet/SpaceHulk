new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png",
		"pozadi" : "assets/textures/pozadí.png",
		"podlaha" : "assets/textures/podlaha.png",
		"kulka" : "assets/textures/kulka.png",
		"player" : "assets/textures/terminator.png",
		"player_powerfist" : "assets/textures/powerfist.png",
		"heavy_bolter" : "assets/textures/heavy_bolter.png",
	};
	this.sounds = {
		"sisters" : "assets/sounds/sisters.mp3"
	};
	this.scripts = {
		"bolter_options" : "assets/js/weapons/bolterOptions.js",
		"ingame" : "assets/js/guis/ingame.js"
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);

		var pozadi = new Object2({
			position: new Vector2(420,270),
			width: 860,
			height: 560,
			texture: new Texture(this.textures.pozadi),
			collidable : false,
		});

		game.add(pozadi);

		var podlaha = new Object2({
			position : new Vector2(450, 464),
			zIndex : 10,
			width : 1000,
			height : 32,
			texture: new Texture(this.textures.podlaha, {
				repeat : true,
				scale : new Vector2(2,2)
			}),
		});

		game.add(podlaha);
		
		var gsTexture = new Texture(this.textures.genestealer, {
			totalFrames: 3,
			currentAnimation: "walking",
			animations: {
				walking: {
					start: 0,
					end: 2,
					speed: 120
				}
			}
		});
		
		var genestealer = new Creature({
			position: new Vector2(400,400),
			width: 75,
			height: 100,
			texture: gsTexture
		});

		game.add(genestealer);
		
		
		var player = new Object2({
			id: "player",
			position: new Vector2(200,390),
			width: 72*2,
			height: 66*2,
			// texture : new Texture(this.textures.player,{
			// 	totalFrames : 5,
			// 	currentAnimation : "standing",
			// 	animations : {
			// 		standing : {
			// 			start : 0,
			// 			end : 0,
			// 			speed : 1
			// 		},
			// 		walking : {
			// 			start : 1,
			// 			end : 4,
			// 			speed : 10
			// 		}
			// 	},
			// }),
			texture : new Texture(this.textures.player_powerfist,{
				totalFrames : 8,
				currentAnimation : "standing",
				animations : {
					standing : {
						start : 0,
						end : 0,
						speed : 1
					},
					walking : {
						start : 1,
						end : 4,
						speed : 100
					},
					punch : {
						start : 5,
						end : 7,
						speed : 200,
						cycle : false
					},
				},
			}),
		});
		
		var bolter_options = this.scripts.bolter_options;
		bolter_options.texture = new Texture(this.textures.heavy_bolter);
		bolter_options.bulletOptions.texture = new Texture(this.textures.kulka);
		
		var zbran = new RangeredWeapon(bolter_options);
		zbran.id = "weapon";

		player.add(zbran);
		game.add(player);

		// game.camera.follow(player.position);

		game.eventhandler.addKeyboardControl("R",
			function (){
				game.camera.shake({x:6,y:0},0.2);
				player.texture.switchAnimation("punch");
				player.getChild("weapon").rendering = false;
			},
			function (){
				game.camera.stopShaking();
				player.texture.switchAnimation("standing");
				// player.getChild("weapon").emiter.emiting = false;
				
			}
		);
		
		game.eventhandler.addKeyboardControl("F",
			function (){
				player.getChild("weapon").rendering = true;
				game.camera.shake({x:4,y:0},0.5);
			},
			function (){
				player.getChild("weapon").emiter.emiting = false;
				game.camera.stopShaking();
			},
			function (){
				//~ game.camera.shake({x:2,y:2},0.5);
				player.getChild("weapon").emiter.emiting = true;
			}
		);
		game.eventhandler.addKeyboardControl("D", function (){
				player.texture.switchAnimation("walking");
				player.texture.flip = false;
				player.getChild("weapon").flip(false);
				player.getChild("weapon").rendering = false;
			},
			function (){
				player.texture.switchAnimation("standing");
			}, 
			function (){
				player.position.x += 1;
			}
		);
		game.eventhandler.addKeyboardControl("A", function (){
				player.texture.switchAnimation("walking");
				player.texture.flip = "x";
				player.getChild("weapon").flip("x");
				player.getChild("weapon").rendering = false;
			}, 
			function (){
				player.texture.switchAnimation("standing");
			},
			function (){
				player.position.x -= 1;
			}
		);
	};
};