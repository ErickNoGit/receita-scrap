import CallXML from "./src/CallXML.ts";
import Revenue from "./src/Revenue.ts";

let call = new CallXML();
let rev: Revenue = new Revenue(await call.request());

let norm = rev.recentDirectory();
call = new CallXML(norm?.url);
rev = new Revenue(await call.request());

console.log(rev.groupFiles());
