export const CYPHER = {};

CYPHER.weightClasses = {
  "Light": "CYPHER.weightClasses.Light",
  "Medium": "CYPHER.weightClasses.Medium",
  "Heavy": "CYPHER.weightClasses.Heavy",
};

CYPHER.optionalWeightClasses = Object.assign({"N/A": "CYPHER.N/A"}, CYPHER.weightClasses);

CYPHER.weaponTypes = {
  "Bashing": "CYPHER.weaponTypes.Bashing",
  "Bladed": "CYPHER.weaponTypes.Bladed",
  "Ranged": "CYPHER.weaponTypes.Ranged",
};

CYPHER.stats = {
  "might": "CYPHER.stats.might",
  "speed": "CYPHER.stats.speed",
  "intellect" : "CYPHER.stats.intellect",
};

CYPHER.skillLevels = {
  "i": "CYPHER.skillLevels.Inability",
  "u": "CYPHER.skillLevels.Untrained",
  "t": "CYPHER.skillLevels.Trained",
  "s": "CYPHER.skillLevels.Specialized"
};

CYPHER.types = [
  {
    abbrev: "a",
    name: "Arkus",
  },
  {
    abbrev: "d",
    name: "Delve",
  },
  {
    abbrev: "g",
    name: "Glaive",
  },
  {
    abbrev: "j",
    name: "Jack",
  },
  {
    abbrev: "n",
    name: "Nano",
  },
  {
    abbrev: "w",
    name: "Wright",
  },
  {
    abbrev: 'p',
    name: 'Paradox',
  },
  {
    abbrev: 's',
    name: 'Spinner',
  },
  {
    abbrev: 'v',
    name: 'Vector',
  },
];

CYPHER.typePowers = {
  'g': 'Combat Maneuvers',
  'j': 'Tricks of the Trade',
  'n': 'Esoteries',
  'a': 'Precepts',
  'd': 'Delve Lores',
  'w': 'Inspired Techniques',
  'v': 'Moves',
  'p': 'Revisions',
  's': 'Twists',
};

CYPHER.damageTrack = [
  {
    label: "CYPHER.pc.damageTrack.hale.label",
    description: "CYPHER.pc.damageTrack.hale.description",
  },
  {
    label: "CYPHER.pc.damageTrack.impaired.label",
    description: "CYPHER.pc.damageTrack.impaired.description",
  },
  {
    label: "CYPHER.pc.damageTrack.debilitated.label",
    description: "CYPHER.pc.damageTrack.debilitated.description",
  },
  {
    label: "CYPHER.pc.damageTrack.dead.label",
    description: "CYPHER.pc.damageTrack.dead.description",
  }
];

CYPHER.recoveries = {
  'action': '1 Action',
  'tenMin': '10 min',
  'oneHour': '1 hour',
  'tenHours': '10 hours'
};

CYPHER.advances = {
  'statPools': '+4 to stat pools',
  'effort': '+1 to Effort',
  'edge': '+1 to Edge',
  'skillTraining': 'Train/specialize skill',
  'other': 'Other',
};

CYPHER.ranges = [
  'Immediate',
  'Short',
  'Long',
  'Very Long'
];

CYPHER.optionalRanges = ["N/A"].concat(CYPHER.ranges);

CYPHER.abilityTypes = [
  "CYPHER.item.ability.type.action",
  "CYPHER.item.ability.type.enabler",
];

CYPHER.cypherTypes = [
  "CYPHER.pc.numenera.cypher.type.anoetic",
  "CYPHER.pc.numenera.cypher.type.occultic",
];

// Note that these colors do not get propagated to the CSS; that would be neat, though
CYPHER.attributeColors = {
  0: 0xff443d,    // Might
  1: 0x87ff3d,    // Speed
  2: 0x3ddbff     // Intellect
};