import * as PIXI from 'pixi.js'
import { Howl, Howler } from 'howler';
import Matter from "matter-js";
// Matter Modules
const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

import Tank from './Tank';
//import './style.css'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({ width: 640, height: 360 });

const engine = Engine.create();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const wallBottom = Bodies.rectangle(
  0,
  app.view.height - 30,
  app.view.width,
  200,
  {
    isStatic: true,
    restitution: 0,
    mass: 10000
  }
);

World.addBody(engine.world, wallBottom)


const t = new Tank(engine, app, "pinco pallo", "../assets/PNG/Default size/tanks_tankDesert1.png");
t.sprite.tint = Math.random() * 0xFFFFFF << 0

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
// app.ticker.add((delta) => {

//   t.body.position = t.sprite.position;
//   t.body.angle = t.sprite.rotation;
// });

app.ticker.add((delta) => {
  elapsed += delta;  


  t.setVelocityX(Math.cos(elapsed / 150.0) / delta);
  
  console.log(t.mainBody.position)

  t.setTextPositionX(t.mainBody.position.x)
  t.sprite.position = t.mainBody.position;
})

Matter.Runner.run(engine);