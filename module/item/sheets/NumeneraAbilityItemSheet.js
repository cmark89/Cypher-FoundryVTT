import { CYPHER } from "../../config.js";

export class NumeneraAbilityItemSheet extends ItemSheet {
    /**
     * Define default rendering options for the weapon sheet
     * @return {Object}
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 550,
            height: 500
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
        return "systems/cypher/templates/item/abilitySheet.html";
    }

    getData() {
        const sheetData = super.getData();

        sheetData.data.ranges = CYPHER.optionalRanges;
        sheetData.data.stats = CYPHER.stats;

        return sheetData;
    }
}