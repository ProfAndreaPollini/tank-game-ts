
import * as PIXI from 'pixi.js'

import Matter from "matter-js";
// Matter Modules
const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composite = Matter.Composite;

class Tank {
  public sprite: PIXI.Sprite;
  startText: PIXI.Text;
  body: Matter.Composite;
  mainBody: Matter.Body;

  constructor(private engine: Matter.Engine, private app: PIXI.Application, public name: string, public image: string) {
    this.sprite = PIXI.Sprite.from(image);
    this.sprite.scale.set(0.5);
    this.sprite.position.set(100, 100);

   

    this.startText = new PIXI.Text(name, {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: 0xff1010,
      align: 'center'
    });

    this.startText.x = this.sprite.position.x;
    this.startText.y = this.sprite.position.y + 20 + this.startText.height;


    app.stage.addChild(this.sprite);
    app.stage.addChild(this.startText);

     this.mainBody = Bodies.rectangle(
      this.sprite.position.x,
      this.sprite.position.y,
      this.sprite.width,
      this.sprite.height,
      {
        restitution: 0,
        mass:1
      }
    );

    this.body = Composite.create({ label: "tank" });
    Composite.add(this.body, this.mainBody);

    World.add(engine.world, this.body);
  }


  public setPosition(_x: number, _y: number) {
    this.sprite.position.set(_x, _y);
    this.mainBody.position.x = _x;
    this.mainBody.position.y = _y;
  }

  public setPositionX(_x: number) {
    this.sprite.position.x = _x;
    this.mainBody.position.x = _x;
  }

  public setTextPositionX(_x: number) {
    this.startText.x = _x;
  }

  public setVelocity(_x: number, _y: number) {
    Body.setVelocity(this.mainBody, { x: _x, y: _y });
  }

  public setVelocityX(_x: number) {
    Body.setVelocity(this.mainBody, { x: _x, y: this.mainBody.velocity.y });
  }

}

export default Tank