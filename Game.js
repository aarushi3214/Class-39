class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("img 1",carImg1);
    car2 = createSprite(300,200);
    car2.addImage("img 2",carImg2);
    car3 = createSprite(500,200);
    car3.addImage("img 3",carImg3);
    car4 = createSprite(700,200);
    car4.addImage("img 4",carImg4);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //title.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;

      // index of the array
      var index = 0;
      //x and y pos of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        index = index+1;
        //pos cars little away from each other in x direction
        x = x+200;
        //use data from the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){
          background("grey");
          image(track,0,-4*displayHeight,displayWidth,displayHeight*5);
          cars[index-1].shapeColor = "green";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //if (plr === "player" + player.index)
         // fill("red")
        //else
         // fill("black");

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10;
      player.update();
    }
    if(player.distance > 2500){
      game.update(2);
   }
    drawSprites();
     }
  end(){
    console.log("gameended")
  }
}

