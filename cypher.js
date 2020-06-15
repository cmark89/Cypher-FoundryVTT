import { NumeneraActor } from './module/actor/NumeneraActor.js';
import { NumeneraNPCActorSheet } from './module/actor/sheets/NumeneraNPCActorSheet.js';
import { NumeneraPCActorSheet } from './module/actor/sheets/NumeneraPCActorSheet.js';

import { NumeneraItem } from './module/item/NumeneraItem.js';
import { NumeneraAbilityItemSheet } from './module/item/sheets/NumeneraAbilityItemSheet.js';
import { NumeneraArmorItemSheet } from './module/item/sheets/NumeneraArmorItemSheet.js';
import { NumeneraArtifactItemSheet } from './module/item/sheets/NumeneraArtifactItemSheet.js';
import { NumeneraCypherItemSheet } from './module/item/sheets/NumeneraCypherItemSheet.js';
import { NumeneraEquipmentItemSheet } from './module/item/sheets/NumeneraEquipmentItemSheet.js';
import { NumeneraSkillItemSheet } from './module/item/sheets/NumeneraSkillItemSheet.js';
import { NumeneraWeaponItemSheet } from './module/item/sheets/NumeneraWeaponItemSheet.js';


import { CYPHER } from './module/config.js';
import { getInitiativeFormula, rollInitiative } from './module/combat.js';
import { preloadHandlebarsTemplates } from './module/templates.js';
import { registerSystemSettings } from './module/settings.js';
import { migrateWorld } from './module/migrations/migrate.js';
import { numeneraSocketListeners } from './module/socket.js';
import { HorrorMode } from './module/horrorMode.js';
import { registerHandlebarHelpers } from './module/handlebarHelpers.js';
import { add3rdBarToPCTokens, cypherToken } from './module/token.js';
import { registerHooks } from './module/hooks.js';
import { useItemMacro } from './module/macro.js';
import { cypherRuler } from './module/ruler.js';

Hooks.once("init", function () {
    console.log('Cypher | Initializing Cypher System');

    game.cypher = {
        useItemMacro,
    };

    // Record Configuration Values
    CONFIG.CYPHER = CYPHER;
    CONFIG.CYPHER.HorrorMode = HorrorMode;

    //Dirty trick to instantiate the right class. Kids, do NOT try this at home.
    CONFIG.Actor.entityClass = NumeneraActor;
    CONFIG.Item.entityClass = NumeneraItem;

    //Each type of Actor will provide its own personal, free-range, bio, nut-free formula.
    Combat.prototype._getInitiativeFormula = getInitiativeFormula;
    Combat.prototype.rollInitiative = rollInitiative;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("cypher", NumeneraNPCActorSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("cypher", NumeneraPCActorSheet, { types: ["pc"], makeDefault: true });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("cypher", NumeneraAbilityItemSheet, { types: ["ability"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraArmorItemSheet, { types: ["armor"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraArtifactItemSheet, { types: ["artifact"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraCypherItemSheet, { types: ["cypher"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraEquipmentItemSheet, { types: ["equipment"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraSkillItemSheet, { types: ["skill"], makeDefault: true });
    Items.registerSheet("cypher", NumeneraWeaponItemSheet, { types: ["weapon"], makeDefault: true });

    //May seem weird but otherwise 
    Items.registerSheet("numenera", ActorSheet, { types: ["npcAttack"], makeDefault: true });

    registerSystemSettings();
    registerHandlebarHelpers();
    preloadHandlebarsTemplates();
});

//Place asy clean, well-behaved hook here
Hooks.once("init", cypherToken);
Hooks.once("init", cypherRuler);
Hooks.once("ready", add3rdBarToPCTokens);
Hooks.once("ready", migrateWorld);
Hooks.once("ready", numeneraSocketListeners);

//Random hooks should go in there
Hooks.once("ready", registerHooks);