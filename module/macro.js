/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemId
 * @return {Promise}
 */
export function useItemMacro(actorId, itemId) {
  const actor = game.actors.entities.find(a => a._id === actorId);
  const item = actor.items.find(i => i._id === itemId);

  if (!item)
      return ui.notifications.warn(game.i18n.localize("CYPHER.macro.use.notActorsItem"));

  // Trigger the item use
  return item.use();
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
export async function createNumeneraMacro(data, slot) {
    if (data.type !== "Item")
        return;

    if (!("data" in data))
        return ui.notifications.warn(game.i18n.localize("CYPHER.macro.create.onlyOwned"));

    const item = data.data;
  
    // Create the macro command
    const command = `game.cypher.useItemMacro("${data.actorId}", "${item._id}");`; 
    let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
    if (!macro) {
      macro = await Macro.create({
        name: item.name,
        type: "script",
        img: item.img,
        command: command,
        flags: { "cypher.itemMacro": true }
      });
    }

    game.user.assignHotbarMacro(macro, slot);

    return false;
  }