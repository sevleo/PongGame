import Game from "../common/Game.js";
import {
  Lib,
  Renderer,
  ClientEngine,
  ExtrapolateStrategy,
  KeyboardControls,
  SyncStrategy,
} from "lance-gg";
// import { InterpolateStrategy } from "lance-gg/src/syncStrategies/InterpolateStrategy.js";

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
  traceLevel: Lib.Trace.TRACE_NONE,
  delayInputCount: 5,
  scheduler: "render-schedule",
};

const interpolateSyncStrategyOptions = {
  localObjBending: 0.2,
  remoteObjBending: 0.5,
  bendingIncrements: 6,
};

function clientSideInit() {
  const controls = new KeyboardControls(clientEngine);
  controls.bindKey("ArrowUp", "ArrowUp", { repeat: true });
  controls.bindKey("ArrowDown", "ArrowDown", { repeat: true });
}

// create a client engine and a game engine
const gameEngine = new Game(defaults);
const clientEngine = new ClientEngine(
  gameEngine,
  new ExtrapolateStrategy(interpolateSyncStrategyOptions),
  defaults,
  new Renderer(gameEngine)
);
gameEngine.on("client__rendererReady", clientSideInit);

document.addEventListener("DOMContentLoaded", function (e) {
  clientEngine.start();
});
