
var dog, dogIMG, happyDog, happyDogIMG;
var database;
var foodS, foodStock;
var count;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogIMG = loadImage("images/dog.png");
  happyDogIMG = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.scale = 0.2;
  dog.addImage(dogIMG);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food();

//count = 20;

  feed = createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  

  background(46,139,87);

  foodObj.display();

  drawSprites();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + "PM", 350,30);
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }


}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){

  dog.addImage(happyDogIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x)
{
  database.ref('/').update({
    Food:x
  })
}