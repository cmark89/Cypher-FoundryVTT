import { HorrorMode } from './horrorMode.js';

export const SPECIAL_ROLL_TYPE = {
  GM_INTRUSION: {
    text: "GM Intrusion",
    color: "#CC0000",
  },
  MINOR_EFFECT: {
    text: "Minor Effect",
    color: "#007700"
  },
  MAJOR_EFFECT: {
    text: "Major Effect",
    color: "#00CC00"
  }
};


/* Dice roll for Numenera

Rolls a d20 and then determines your success level.
*/
export function numeneraRoll(level = 0) {
  let formula = "d20";
  if (level) formula += "+" + 3 * level;

  return new Roll(formula).roll();
}

export function rollText(dieRoll) {
  if (HorrorMode.isActive) {
    let result = [];
    if (dieRoll <= HorrorMode.horrorLevel) {
      // Our roll is within the increasing horror level band, so it becomes a GM intrusion even if it's not a 1.
      result.push(SPECIAL_ROLL_TYPE.GM_INTRUSION);
    }
    if (dieRoll === 19) {
      result.push(SPECIAL_ROLL_TYPE.MINOR_EFFECT);
    } else if (dieRoll === 20) {
      result.push(SPECIAL_ROLL_TYPE.MAJOR_EFFECT);
    }
    return result;
  } else {
    switch (dieRoll) {
      case 1:
        return SPECIAL_ROLL_TYPE.GM_INTRUSION;
      case 19:
        return SPECIAL_ROLL_TYPE.MINOR_EFFECT;
      case 20:
        return SPECIAL_ROLL_TYPE.MAJOR_EFFECT;
      default:
        return null;
    }
  }
}
