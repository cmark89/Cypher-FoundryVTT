import { NumeneraActor } from './module/actor/NumeneraActor.js';
import { NumeneraNPCActorSheet } from './module/actor/sheets/NumeneraNPCActorSheet.js';
import { NumeneraPCActorSheet } from './module/actor/sheets/NumeneraPCActorSheet.js';

import { NUMENERA } from './module/config.js';
import { getInitiativeFormula, rollInitiative } from './module/combat.js';
import { rollText } from './module/roll.js';
import { preloadHandlebarsTemplates } from './module/templates.js';
import { registerSystemSettings } from './module/settings.js';

import { NumeneraItem } from './module/item/NumeneraItem.js';
import { NumeneraAbilityItemSheet } from './module/item/sheets/NumeneraAbilityItemSheet.js';
import { NumeneraArmorItemSheet } from './module/item/sheets/NumeneraArmorItemSheet.js';
import { NumeneraArtifactItemSheet } from './module/item/sheets/NumeneraArtifactItemSheet.js';
import { NumeneraCypherItemSheet } from './module/item/sheets/NumeneraCypherItemSheet.js';
import { NumeneraEquipmentItemSheet } from './module/item/sheets/NumeneraEquipmentItemSheet.js';
import { NumeneraOddityItemSheet } from './module/item/sheets/NumeneraOddityItemSheet.js';
import { NumeneraSkillItemSheet } from './module/item/sheets/NumeneraSkillItemSheet.js';
import { NumeneraWeaponItemSheet } from './module/item/sheets/NumeneraWeaponItemSheet.js';

import { migrateWorld } from './module/migrations/migrate.js';

Hooks.once("init", function() {
    console.log('Numenera | Initializing Numenera System');

    // Record Configuration Values
    CONFIG.NUMENERA = NUMENERA;

    //Dirty trick to instantiate the right class. Kids, do NOT try this at home.
    CONFIG.Actor.entityClass = NumeneraActor;
    CONFIG.Item.entityClass = NumeneraItem;

    //Each type of Actor will provide its own personal, free-range, bio, nut-free formula.
    Combat.prototype._getInitiativeFormula = getInitiativeFormula;
    Combat.prototype.rollInitiative = rollInitiative;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("numenera", NumeneraNPCActorSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("numenera", NumeneraPCActorSheet, { types: ["pc"], makeDefault: true });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("numenera", NumeneraAbilityItemSheet, { types: ["ability"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraArmorItemSheet, { types: ["armor"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraArtifactItemSheet, { types: ["artifact"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraCypherItemSheet, { types: ["cypher"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraEquipmentItemSheet, { types: ["equipment"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraOddityItemSheet, { types: ["oddity"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraSkillItemSheet, { types: ["skill"], makeDefault: true });
    Items.registerSheet("numenera", NumeneraWeaponItemSheet, { types: ["weapon"], makeDefault: true });

    registerSystemSettings();
    preloadHandlebarsTemplates();
});
  
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

Hooks.on("renderChatMessage", (app, html, data) => {
    const roll = JSON.parse(data.message.roll);

    //Don't apply ChatMessage enhancement to recovery rolls
    if (roll && roll.dice[0].faces === 20)
    {
        const special = rollText(roll.total);
        const dt = html.find("h4.dice-total")[0];

        //"special" refers to special attributes: minor/major effect or GM intrusion text, special background, etc.
        if (special) {
            const { text, color } = special;
            const newContent = `<span class="numenera-message-special">${text}</span>`;

            $(newContent).insertBefore(dt);
        }

        if (game.settings.get("cypher", "d20Rolling") === "taskLevels") {
            const rolled = roll.dice[0].rolls[0].roll;
            const taskLevel = Math.floor(rolled / 3);
            const skillLevel = (roll.total - rolled) / 3;
            const sum = taskLevel + skillLevel;

            let text = `Success Level ${sum}`;

            if (skillLevel !== 0) {
                const sign = sum > 0 ? "+" : "-";
                text += ` (${taskLevel}${sign}${skillLevel})`;
            }

            dt.textContent = text;
        }

    }
});

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", migrateWorld);