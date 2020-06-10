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

  game.settings.register("cypher", "trademarkNotice", {
    name: "Trademark Notice",
    hint: "The Monte Cook Games logo, Numenera, and the Numenera logo are trademarks of Monte Cook Games, LLC in the U.S.A. and other countries. All Monte Cook Games characters and character names, and the distinctive likenesses thereof, are trademarks of Monte Cook Games, LLC. Content on this site or associated files derived from Monte Cook Games publications is © 2013-2019 Monte Cook Games, LLC. Monte Cook Games permits web sites and similar fan-created publications for their games, subject to the policy given at http://www.montecookgames.com/fan-use-policy/. The contents of this site are for personal, non-commercial use only. Monte Cook Games is not responsible for this site or any of the content, that did not originate directly from Monte Cook Games, on or in it. Use of Monte Cook Games’s trademarks and copyrighted materials anywhere on this site and its associated files should not be construed as a challenge to those trademarks or copyrights. Materials on this site may not be reproduced or distributed except with the permission of the site owner and in compliance with Monte Cook Games policy given at http://www.montecookgames.com/fan-use-policy/.",
    scope: "world",
    config: true,
    type: null,
    default: null
  });
}
