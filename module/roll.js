/* Dice roll for Numenera

Rolls a d20 and then determines your success level.
*/
export function numeneraRoll(level = 0) {
  let formula = "d20";
  if (level) formula += "+" + 3 * level;

  return new Roll(formula).roll();
}

export function rollText(dieRoll) {
  switch (dieRoll) {
    case 1:
      return {
        text: "GM Intrusion",
        color: "#CC0000",
      }

    case 19:
      return {
        text: "Minor Effect",
        color: "#007700",
      }

    case 20:
      return {
        text: "Major Effect",
        color: "#00CC00",
      }

    default:
      return null;
  }
}
