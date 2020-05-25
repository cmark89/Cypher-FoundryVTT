export const registerSystemSettings = function() {

  /**
   * Configure the Numenera version being used
   */
  game.settings.register("numenera", "systemVersion", {
    name: "Numenera Version",
    hint: "Select the Numenera version you're using. Version 1 is the original 2013 edition with the orange cover; version 2 is the 2018 split into two books, Discovery and Destiny",
    scope: "world",
    config: true,
    type: Number,
    default: 2,
    choices: {
      1: "Version 1",
      2: "Version 2",
    },
  });

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
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 70e76b0bf1bfa43c86438be869349d9414c7b4d7
  });
  
  /**
   * Configure whether or not to show skill icons
   */
  game.settings.register("numenera", "showSkillIcons", {
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
  game.settings.register("numenera", "showAbilityIcons", {
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
  game.settings.register("numenera", "showNumeneraIcons", {
    name: "Numenera Icons",
    hint: "Enable to show cypher, artifact, and oddity icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  /**
   * Configure whether or not to show numenera icons
   */
  game.settings.register("numenera", "showEquipmentIcons", {
    name: "Equipment Icons",
    hint: "Enable to show weapon, armor, and miscellaneous item icons in player character sheets",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}