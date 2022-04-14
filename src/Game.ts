import { vec } from '@basementuniverse/commonjs';
import * as config from './config.json';
import * as constants from './constants';
import Content from './content/Content';
import Debug from './Debug';
import Input from './Input';

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastFrameTime: number;
  private lastFrameCountTime: number;
  private frameRate: number = 0;
  private frameCount: number = 0;

  public static screen: vec;

  public constructor(container: HTMLElement | null) {
    if (container === null) {
      throw new Error('A valid container element must be specified.');
    }
    if (container.tagName.toLowerCase() !== 'canvas') {
      throw new Error('Container element must be a canvas.');
    }
    this.canvas = container as HTMLCanvasElement;

    // Get a 2d context
    const context = this.canvas.getContext('2d');
    if (context !== null) {
      this.context = context;
    } else {
      throw new Error("Couldn't get a 2d context.");
    }

    // Handle resize
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Disable image smoothing for pixelated graphics
    this.context.imageSmoothingEnabled = false;
  }

  /**
   * Initialise the game and start playing
   */
  public initialise(): void {

    // Initialise subsystems
    Debug.initialise();
    Input.initialise();
    Content.initialise();

    // Start game loop
    this.lastFrameTime = this.lastFrameCountTime = performance.now();
    this.loop();

    // TODO start the game...
  }

  private loop(): void {
    const now = performance.now();
    const elapsedTime = Math.min(now - this.lastFrameTime, constants.FPS_MIN);

    // Calculate framerate
    if (now - this.lastFrameCountTime >= 1000) {
      this.lastFrameCountTime = now;
      this.frameRate = this.frameCount;
      this.frameCount = 0;
    }
    this.frameCount++;
    this.lastFrameTime = now;
    if (config.showFPS) {
      Debug.value('FPS', this.frameRate, { align: 'right' });
    }

    // Do game loop
    this.update(elapsedTime);
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private update(dt: number): void {
    Game.screen = vec(this.canvas.width, this.canvas.height);

    // TODO update the game...

    Input.update();
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.setTransform(1, 0, 0, 1, 0, 0);

    // TODO render the game...

    Debug.draw(this.context);
  }
}
