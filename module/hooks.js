import { createNumeneraMacro } from './macro.js';
import { rollText } from './roll.js';
import { HorrorMode } from './horrorMode.js';

/**
 * This function is simply meant to be the place where all hooks are registered.
 *
 * @export
 */
export async function registerHooks() {
  Hooks.on("ready", () => ui.notifications.info(
    `Numenera and its logo are trademarks of Monte Cook Games, LLC in the U.S.A. and other countries.
    All Monte Cook Games characters and character names, and the distinctive likenesses thereof,
    are trademarks of Monte Cook Games, LLC. Content derived from Monte Cook Games publications is
    © 2013-2019 Monte Cook Games, LLC.`)
  );

  /*
  Display an NPC's difficulty between parentheses in the Actors list
  */
  Hooks.on('renderActorDirectory', (app, html, options) => {
    const found = html.find(".entity-name");
    
    app.entities
        .filter(actor => actor.data.type === 'npc')
        .forEach(actor => {
            found.filter((i, elem) => elem.innerText === actor.data.name)
                  .each((i, elem) => elem.innerText += ` (${actor.data.data.level * 3})`);
        })
  });

  Hooks.on('renderCompendium', async (app, html, options) => {
      const npcs = game.actors.entities.filter(e => e.constructor === NumeneraNPCActor);

      html.find(".entry-name")
          .each((i, el) => {
          const actor = npcs.find(npc => el.innerText.indexOf(npc.data.name) !== -1);
          if (!actor)
              return;

          //Display the NPC's target between parentheses
          el.innerHTML += ` (${actor.data.data.level * 3})`;
      });

  });

  Hooks.on("renderChatMessage", (app, html, data) => {
    if (!data.message.roll)
        return;

    const roll = JSON.parse(data.message.roll);
    const isRollTable = app.data.flags && app.data.flags.core && app.data.flags.core.RollTable;

    //Don't apply ChatMessage enhancement to recovery rolls or to rollable tables
    if (roll && roll.dice[0].faces === 20 && !isRollTable) {
        const special = rollText(roll.total);
        const dt = html.find("h4.dice-total")[0];

        //"special" refers to special attributes: minor/major effect or GM intrusion text, special background, etc.
        if (special) {
            let putSpecialText = function (s) {
                const { text, color } = s;
                const newContent = `<p><span class="numenera-message-special" style="color: ${color}">${text}</span></p>`;

                $(newContent).insertBefore(dt);
            };

            // If we're not using horror mode, just spit out the special text as usual
            if (!HorrorMode.isActive || !Array.isArray(special)) {
                putSpecialText(special);
            } else {
                // Horror mode will always give us back an array here, so do with it as appropriate
                special.forEach(putSpecialText);
            }
        }

        if (game.settings.get("cypher", "d20Rolling") === "taskLevels") {
            const rolled = roll.dice[0].rolls[0].roll;
            const taskLevel = Math.floor(rolled / 3);
            const skillLevel = (roll.total - rolled) / 3;
            const sum = taskLevel + skillLevel;

            let text = `[${rolled}] Success Level ${sum}`;

            if (skillLevel !== 0) {
                const sign = sum > 0 ? "+" : "-";
                text += ` (${taskLevel}${sign}${skillLevel})`;
            }

            dt.textContent = text;
        }

    }
});

  /**
   * Add additional system-specific sidebar directory context menu options for D&D5e Actor entities
   * @param {jQuery} html         The sidebar HTML
   * @param {Array} entryOptions  The default array of context menu options
   */
  Hooks.on("getActorDirectoryEntryContext", (html, entryOptions) => {
      entryOptions.push({
          name: game.i18n.localize("CYPHER.gmIntrusion"),
          icon: '<i class="fas fa-exclamation-circle"></i>',
          callback: li => {
              const actor = game.actors.get(li.data("entityId"));
              const ownerIds = Object.entries(actor.data.permission)
                  .filter(entry => {
                      const [id, permissionLevel] = entry;
                      return permissionLevel >= ENTITY_PERMISSIONS.OWNER
                          && id !== game.user.id
                  })
                  .map(usersPermissions => usersPermissions[0]);

              game.socket.emit("system.cypher", {type: "gmIntrusion", data: {
                  userIds: ownerIds,
                  actorId: actor.data._id,
              }});

              ChatMessage.create({
                  content: `<h2>${game.i18n.localize("CYPHER.gmIntrusion")}</h2><br/>${game.i18n.localize("CYPHER.gmIntrusionText")} ${actor.data.name}`,
              });
          },
          condition: li => {
              if (!game.user.isGM)
                  return false;

              const actor = game.actors.get(li.data("entityId"));
              return actor && actor.data.type === "pc";
          }
      });
  });

  // Many thanks to @asacolips for their awesome tutorial: https://gitlab.com/asacolips-projects/foundry-mods/foundryvtt-system-tutorial/-/blob/master/pages/16-macrobar-support.md
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (_, data, slot) => createNumeneraMacro(data, slot));
}