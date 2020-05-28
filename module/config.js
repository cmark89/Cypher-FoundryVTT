export const CYPHER = {};

CYPHER.weightClasses = [
  'Light',
  'Medium',
  'Heavy'
];

CYPHER.optionalWeightClasses = ["N/A"].concat(CYPHER.weightClasses);

CYPHER.weaponTypes = [
  'Bashing',
  'Bladed',
  'Ranged',
];

CYPHER.stats = [
  'Might',
  'Speed',
  'Intellect',
];

CYPHER.skillLevels = {
  'i': 'Inability',
  'u': 'Untrained',
  't': 'Trained',
  's': 'Specialized'
};

CYPHER.types = [
  {
    abbrev: 'a',
    name: 'Arkus',
  },
  {
    abbrev: 'd',
    name: 'Delve',
  },
  {
    abbrev: 'g',
    name: 'Glaive',
  },
  {
    abbrev: 'j',
    name: 'Jack',
  },
  {
    abbrev: 'n',
    name: 'Nano',
  },
  {
    abbrev: 'w',
    name: 'Wright',
  },
];

CYPHER.typePowers = {
  'g': 'Combat Maneuvers',
  'j': 'Tricks of the Trade',
  'n': 'Esoteries',
  'a': 'Precepts',
  'd': 'Delve Lores',
  'w': 'Inspired Techniques',
};

CYPHER.damageTrack = [
  {
    label: 'Hale',
    description: 'Normal state for a character.'
  },
  {
    label: 'Impaired',
    description: 'In a wounded or injured state. Applying Effort costs 1 extra point per effort level applied.'
  },
  {
    label: 'Debilitated',
    description: 'In a critically injured state. The character can do no other action than to crawl an immediate distance; if their Speed pool is 0, they cannot move at all.'
  },
  {
    label: 'Dead',
    description: 'The character is dead.'
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
  'Action',
  'Enabler',
];

CYPHER.cypherTypes = [
  "Anoetic",
  "Occultic",
];

// Note that these colors do not get propagated to the CSS; that would be neat, though
CYPHER.attributeColors = {
  0: 0xff443d,    // Might
  1: 0x87ff3d,    // Speed
  2: 0x3ddbff     // Intellect
};