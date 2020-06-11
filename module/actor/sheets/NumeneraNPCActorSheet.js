import { confirmDeletion } from "../../apps/ConfirmationDialog.js";
import { CYPHER } from "../../config.js";
import { NumeneraNpcAttackItem } from "../../item/NumeneraNPCAttack.js";

//TODO copied from PCSheet, should be in a separate, shared file.


//Sort function for order
const sortFunction = (a, b) => a.data.order < b.data.order ? -1 : a.data.order > b.data.order ? 1 : 0;

/**
 * Higher order function that generates an item creation handler.
 *
 * @param {String} itemType The type of the Item (eg. 'ability', 'cypher', etc.)
 * @param {*} itemClass 
 * @param {*} [callback=null]
 * @returns
 */
function onItemCreateGenerator(itemType, itemClass, callback = null) {
  return async function(event = null) {
    if (event)
    event.preventDefault();

    const newName = game.i18n.localize(`CYPHER.item.${itemType}.new${itemType.capitalize()}`);

    const itemData = {
      name: newName,
      type: itemType,
      data: new itemClass({}),
    };

    const newItem = await this.actor.createOwnedItem(itemData);
    if (callback)
      callback(newItem);

    return newItem;
  }
}

function onItemEditGenerator(editClass, callback = null) {
  return async function (event) {
    event.preventDefault();
    event.stopPropagation(); //Important! otherwise we get double rendering

    const elem = event.currentTarget.closest(editClass);

    if (!elem)
      throw new Error(`Missing ${editClass} class element`);
    else if (!elem.dataset.itemId)
      throw new Error(`No itemID on ${editClass} element`);
      
    const updated = {_id: elem.dataset.itemId};
    
    const splitName = event.currentTarget.name.split(".");
    const idIndex = splitName.indexOf(updated._id);
    const parts = splitName.splice(idIndex + 1);

    //Add the newly added property to the object
    //This next block is necessary to support properties at various depths
    //e.g support actor.name as well as actor.data.cost.pool

    let previous = updated;
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];

      if (i === parts.length - 1) {
        //Last part, the actual property
        if (event.target.type === "checkbox") {
          previous[name] = event.currentTarget.checked;
        } else if (event.target.dataset.dtype === "Boolean") {
          previous[name] = (event.currentTarget.value === "true");
        } else {
          previous[name] = event.currentTarget.value;
        }
      } else {
        previous[name] = {};
        previous = previous[name];
      }
    }

    const updatedItem = await this.actor.updateEmbeddedEntity("OwnedItem", updated);
    if (callback)
      callback(updatedItem);
  }
}

function onItemDeleteGenerator(deleteType, callback = null) {
  return async function (event) {
    event.preventDefault();

    if (await confirmDeletion(deleteType)) {
      const elem = event.currentTarget.closest("." + deleteType);
      const itemId = elem.dataset.itemId;
      const toDelete = this.actor.data.items.find(i => i._id === itemId);
      this.actor.deleteOwnedItem(itemId);

      if (callback)
        callback(toDelete);
    }
  }
}

/**
 * Extend the basic ActorSheet class to do all the Numenera things!
 *
 * @type {ActorSheet}
 */
export class NumeneraNPCActorSheet extends ActorSheet {
  /**
   * Define default rendering options for the NPC sheet
   * @return {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 850,
      height: 650,
    tabs: [
        {
          navSelector: ".tabs",
          contentSelector: "#npc-sheet-body",
        },
      ],
    });
  }

  constructor(...args) {
    super(...args);

    this.onAttackCreate = onItemCreateGenerator("npcAttack", NumeneraNpcAttackItem);
    this.onAttackEdit = onItemEditGenerator(".npcAttack");
    this.onAttackDelete = onItemDeleteGenerator("npcAttack");
  }

  /**
   * Get the correct HTML template path to use for rendering this particular sheet
   * @type {String}
   */
  get template() {
    return "systems/cypher/templates/actor/npcSheet.html";
  }

  /**
   * @inheritdoc
   */
  getData() {
    const sheetData = super.getData();

    sheetData.ranges = CYPHER.ranges.map(r => game.i18n.localize(r));

    sheetData.data.items = sheetData.actor.items || {};

    const items = sheetData.data.items;
    if (!sheetData.data.items.attacks)
      sheetData.data.items.attacks = items.filter(i => i.type === "npcAttack").sort(sortFunction);

    return sheetData;
  }

  /**
   * Add character sheet-specific event listeners.
   *
   * @param {*} html
   * @memberof ActorSheetNumeneraNPC
   */
  activateListeners(html) {
    super.activateListeners(html);

    const attacksTable = html.find("table.attacks");
    attacksTable.on("click", ".attack-create", this.onAttackCreate.bind(this));
    attacksTable.on("click", ".attack-delete", this.onAttackDelete.bind(this));
    attacksTable.on("change", "textarea", this.onAttackEdit.bind(this));
  }

  /**
   * @override
   */
  _onDeleteEmbeddedEntity(...args) {
    /* Necessary because, after deleting an item, Foundry fetches the Item's sheet
    class and, well, NPC attacks don't have one. Intercept the exception and, in that
    particular case, ignore it */
    try {
      super._onDeleteEmbeddedEntity(...args);
    } catch (e) {
      if (!e.message.includes("No valid Item sheet found for type npcAttack")) {
        throw e;
      }
    }
  }
}
