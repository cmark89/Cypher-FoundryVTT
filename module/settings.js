export const registerSystemSettings = function() {
  /**
   * Configure d20-rolling options
   */
  game.settings.register("cypher", "d20Rolling", {
    name: "d20 rolling",
    hint: "Select the behavior of d20 rolls in your game",
    scope: "world",
    config: true,
    type: String,
    default: "taskLevels",
    choices: {
      "taskLevels": "Output task level success instead of numbers",
      "straightNumbers": "Output numbers and modifiers as is",
    }
  });

  /**
   * Configure cypher short character sheet options
   */
  game.settings.register("cypher", "cypherShort", {
    name: "Use Cypher Short characters",
    hint: "Enable to use a simplified character sheet without progression fields",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  /**
   * Configure cypher usage
   */
  game.settings.register("cypher", "useCyphers", {
    name: "Enable Cyphers",
    hint: "Disable to remove the cypher section from PC character sheets. Only disable if you are certain your game will not use cyphers at all.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  /**
   * Configure whether or not to show skill icons
   */
  game.settings.register("cypher", "showSkillIcons", {
    name: "Skill Icons",
    hint: "Enable to show skill icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  /**
   * Configure whether or not to show ability icons
   */
  game.settings.register("cypher", "showAbilityIcons", {
    name: "Ability Icons",
    hint: "Enable to show ability icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  /**
   * Configure whether or not to show numenera icons
   */
  game.settings.register("cypher", "showNumeneraIcons", {
    name: "Numenera Icons",
    hint: "Enable to show cypher and artifact icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  /**
   * Configure whether or not to show numenera icons
   */
  game.settings.register("cypher", "showEquipmentIcons", {
    name: "Equipment Icons",
    hint: "Enable to show weapon, armor, and miscellaneous item icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}