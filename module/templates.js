/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async() => {

    // Define template paths to load
    const templatePaths = [
        // Actor Sheets
        "systems/cypher/templates/actor/characterSheet.html",
        "systems/cypher/templates/actor/npcSheet.html",

        // Dialog Sheets
        "systems/cypher/templates/dialog/recovery.html",

        //Item sheets
        "systems/cypher/templates/item/abilitySheet.html",
        "systems/cypher/templates/item/armorSheet.html",
        "systems/cypher/templates/item/artifactSheet.html",
        "systems/cypher/templates/item/cypherSheet.html",
        "systems/cypher/templates/item/equipmentSheet.html",
        "systems/cypher/templates/item/odditySheet.html",
        "systems/cypher/templates/item/skillSheet.html",
        "systems/cypher/templates/item/weaponSheet.html",

        //Token stuff
        "systems/cypher/templates/hud/tokenHUD.html",
        "systems/cypher/templates/scene/tokenConfig.html",
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};