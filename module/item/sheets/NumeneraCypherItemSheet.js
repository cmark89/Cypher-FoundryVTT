import { NUMENERA } from "../../config.js";

export class NumeneraCypherItemSheet extends ItemSheet {
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
        return "systems/cypher/templates/item/cypherSheet.html";
    }

    get type() {
        return "cypher";
    }

    getData() {
        const sheetData = super.getData();

        return sheetData;
    }
}