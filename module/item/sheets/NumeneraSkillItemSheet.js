import { CYPHER } from "../../config.js";

export class NumeneraSkillItemSheet extends ItemSheet {
    /**
     * Define default rendering options for the weapon sheet
     * @return {Object}
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 500,
            height: 400
        });
    }

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    /**
     * Get the correct HTML template path to use for rendering this particular sheet
     * @type {String}
     */
    get template() {
        return "systems/cypher/templates/item/skillSheet.html";
    }

    getData() {
        const sheetData = super.getData();

        sheetData.stats = {};
        for (const prop in CYPHER.stats) {
          sheetData.stats[prop] = game.i18n.localize(CYPHER.stats[prop]);
        }

        return sheetData;
    }
}