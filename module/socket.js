import { GMIntrusionDialog } from "./apps/GMIntrusionDialog.js";

export function numeneraSocketListeners() {
  game.socket.on("system.cypher", handleSocketMessage);
}

function handleSocketMessage(args) {
  const {type, data} = args;

  if (type === "gmIntrusion") {
    let {actorId, userIds} = data;
    handleGMIntrusion(actorId, userIds);
  } else if (type === "horrorLevel") {
    let {isActive, horrorLevel} = data;
    setHorrorLevel(isActive, horrorLevel);
  }
}

function handleGMIntrusion(actorId, userIds) {
  if (!game.ready || game.user.isGM || !userIds.find(id => id === game.userId)){
    return;
  }

  //TODO disable or don't show Refuse button if PC has 0 XP
  //TODO display message for everyone about 1) intrusion and 2) choice
  const actor = game.actors.entities.find(a => a.data._id === actorId);
  const dialog = new GMIntrusionDialog(actor);
  dialog.render(true);
}

function setHorrorLevel(isActive, horrorLevel) {
  if (!game.ready || game.user.isGM){
    return;
  }

  CONFIG.CYPHER.HorrorMode.setHorrorLevel(horrorLevel);
  CONFIG.CYPHER.HorrorMode.setActive(isActive);
}