var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed;
var lastFed;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed The Dog");
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  var feedtime =database.ref('FeedTime');
  feedtime.on("value",(data)=>{
    lastFed=data.val();
  })

textSize(20);
fill("white");

 if(lastFed>=12) {
   text("LastFed : "+lastFed%12+" pm ",300,30);
 }
 else if(lastFed=12) {
  text("LastFed : "+lastFed+" noon ",300,30);
}
else {
  text("LastFed : "+lastFed+" am ",300,30);
}


  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
