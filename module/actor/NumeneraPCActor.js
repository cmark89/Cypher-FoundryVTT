import { numeneraRoll, numeneraRollFormula } from "../roll.js";

const effortObject = {
  cost: 0,
  effortLevel: 0,
  warning: null,
};

/**
 * Extend the base Actor class to implement additional logic specialized for Numenera.
 */
export class NumeneraPCActor extends Actor {

  prepareData() {
    super.prepareData();

    //Armor would sometimes get desynchronized with the armor items, this fixes it
    this.data.data.armor = this.getTotalArmor();
  }

  getInitiativeFormula() {
    //Check for an initiative skill
    const initSkill = this.items.find(i => i.type === "skill" && i.name.toLowerCase() === "initiative")

    //TODO possible assets, effort on init roll
    return this.getSkillFormula(initSkill);
  }

  get effort() {
    const data = this.data.data;

    return data.tier + (data.advances.effort ? 1 : 0);
  }

  /**
   * Get the current PC's level on the damage track as an integer, 0 being Hale and 3 being Dead.
   * @type {Object} stats Stats object (see template.json)
   */
  damageTrackLevel(stats = null) {
    if (stats === null)
      stats = this.data.data.stats;

    //Each stat pool whose value is 0 counts as being one step higher on the damage track
    return Object.values(stats).filter(stat => {
      return stat.pool.value === 0;
    }).length;
  }

  getSkillFormula(skill) {
    let skillLevel = 0;
    if (skill) {
      skillLevel = this.getSkillLevel(skill);
    }
    
    return numeneraRollFormula(skillLevel);
  }

  rollSkillById(skillId) {
    const skill = this.getOwnedItem(skillId);
    return this.rollSkill(skill);
  }

  /**
   * Given a skill ID, fetch the skill level bonus and roll a d20, adding the skill
   * bonus.
   *
   * @param {String} skillId
   * @returns
   * @memberof NumeneraPCActor
   */
  rollSkill(skill) {
    switch (this.data.data.damageTrack) {
      case 2:
        ui.notifications.warn(game.i18n.localize("CYPHER.pc.damageTrack.debilitated.warning"));
        return;

      case 3:
        ui.notifications.warn(game.i18n.localize("CYPHER.pc.damageTrack.dead.warning"));
        return;
    }
  
    const roll = new Roll(this.getSkillFormula(skill)).roll();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `${game.i18n.localize("CYPHER.rolling")} ${skill.name}`,
    });
  }

  /**
   * Given a skill ID, return this skill's modifier as a a numeric value.
   *
   * @param {string} skillId Item ID of the skill
   * @returns {Number} Skill modifier in the [-1, 2] range
   * @memberof ActorNumeneraPC
   */
  getSkillLevel(skill) {
    if (!skill || !skill.data)
      throw new Error("No skill provided");

    skill = skill.data;
    if (skill.hasOwnProperty("data"))
      skill = skill.data;

    let level = -Number(skill.inability) || 0; //Inability subtracts 1 from overall level

    if (skill.specialized) level += 2;
    else if (skill.trained) level += 1;

    return level;
  }

  /**
   * Given a stat ID, return all skills related to that stat.
   *
   * @param {string} statId
   * @returns {Array}
   * @memberof ActorNumeneraPC
   */
  filterSkillsByStat(statId) {
    if (!statId) {
      return this.skills;
    }

    return this.data.data.skills.filter(id => id == statId);
  }

  getEffortCostFromStat(event) {
    //Return value, copy from template object
    const value = {...effortObject};

    const effortLevel = event.target.value;
    if (effortLevel === 0) {
      return value;
    }
        
    const actorData = this.data.data;

    const statId = event.target.dataset.statId;
    const stat = actorData.stats[statId];

    //The first effort level costs 3 pts from the pool, extra levels cost 2
    //Substract the related Edge, too
    const availableEffortFromPool = (stat.pool.current + stat.edge - 1) / 2;

    //A PC can use as much as their Effort score, but not more
    //They're also limited by their current pool value
    const finalEffort = Math.max(effortLevel, actorData.effort, availableEffortFromPool);
    const cost = 1 + 2 * finalEffort - stat.edge;

    //TODO take free levels of Effort into account here

    let warning = null;
    if (effortLevel > availableEffortFromPool) {
      warning = null; // TODO put into localization file `Not enough points in your ${statId} pool for that level of Effort`;
    }

    value.cost = cost;
    value.effortLevel = finalEffort;
    value.warning = warning;

    return value;
  }

  getTotalArmor() {
    return this.getEmbeddedCollection("OwnedItem").filter(i => i.type === "armor")
      .reduce((acc, armor) => acc + Number(armor.data.armor), 0);
  }

  async onGMIntrusion(accepted) {
    let xp = this.data.data.xp;
    let choice;

    if (accepted) {
      xp++;
      choice = game.i18n.localize("CYPHER.gmIntrusionAccepts");
    } else {
      xp--;
      choice = game.i18n.localize("CYPHER.gmIntrusionRefuses");
    }

    this.update({
      _id: this._id,
      "data.xp": xp,
    });

    ChatMessage.create({
      content: `<h2>${game.i18n.localize("CYPHER.gmIntrusion")}</h2><br/>${this.data.name} ${choice}`,
    });
  }

  isOverCypherLimit() {
    const cyphers = this.getEmbeddedCollection("OwnedItem").filter(i => i.type === "cypher");
    return  this.data.data.cypherLimit < cyphers.length;
  }

  /**
   * BASE CLASS OVERRIDES
   */

  /**
   * @override
   */
  async createEmbeddedEntity(...args) {
    const [_, data] = args;

    if (!data.data) return;

    //Prepare numenera items by rolling their level, if they don't have one already
    switch (data.type) {
      case "artifact":
      case "cypher":
      const itemData = data.data;

      if (!itemData.level && itemData.levelDie) {  
        try {
            //Try the formula as is first
            itemData.level = new Roll(itemData.levelDie).roll().total;
            await this.update({
                _id: this._id,
                "data.level": itemData.level,
            });
          } catch (Error) {
            try {
              itemData.level = parseInt(itemData.level);
            } catch (Error) {
                //Leave it as it is
            }
        }
      } else {
          itemData.level = itemData.level || null;
      }
        break;
    }

    const newItem = await super.createEmbeddedEntity(...args);

    switch (data.type) {
      case "ability":
        const actorAbility = newItem;

        if (!actorAbility) throw new Error("No related ability exists");

        //Now check if a skill with the same name already exists
        const relatedSkill = this.items.find(
          (i) => i.data.type === "skill" && i.data.name === actorAbility.name
        );

        if (relatedSkill) {
          if (relatedSkill.relatedAbilityId)
            throw new Error(
              "Skill related to new abiltiy already has a skill linked to it"
            );

          //A skil already has the same name as the ability
          //This is certainly the matching skill, no need to create a new one
          const updated = {
            _id: relatedSkill.data._id,
            "data.relatedAbilityId": actorAbility._id,
          };
          await this.updateEmbeddedEntity("OwnedItem", updated);

          ui.notifications.info(game.i18n.localize("CYPHER.info.linkedToSkillWithSameName"));
        } else {
          //Create a related skill if one does not already exist
          const skillData = {
            stat: actorAbility.data.cost.pool,
            relatedAbilityId: actorAbility._id,
          };

          const itemData = {
            name: actorAbility.name,
            type: "skill",
            data: skillData,
          };

          await this.createOwnedItem(itemData);

          ui.notifications.info(game.i18n.localize("CYPHER.info.skillWithSameNameCreated"));
        }
        break;
    }

    return newItem;
  }

  updateEmbeddedEntity(embeddedName, data, options={}) {
    const updated = super.updateEmbeddedEntity(embeddedName, data, options);

    const updatedItem = this.getOwnedItem(updated._id);

    if (!updatedItem)
      return;

    //TODO I AM A HACK PLEASE DESTROY ME I DO NOT DESERVE TO EXIST THANK U :)
    //... or maybe not. It's not elegant but it works well to avoid recursing
    if (options.fromActorUpdateEmbeddedEntity)
      return updated;

    switch (updatedItem.type) {
      case "ability":
        const relatedSkill = this.items.find(i => i.data.data.relatedAbilityId === updatedItem._id);
        if (!relatedSkill)
          break;

        const ability = this.getOwnedItem(relatedSkill.data.data.relatedAbilityId);
        if (!ability)
          break;

        if (!options.fromActorUpdateEmbeddedEntity)
          options.fromActorUpdateEmbeddedEntity = "ability";

        ability.updateRelatedSkill(relatedSkill, options);
        break;

      case "skill":
        if (!updatedItem.data.data.relatedAbilityId)
          break;

        const skill = this.getOwnedItem(updatedItem._id);
        if (!skill)
          break;

        const relatedAbility = this.items.find(i => i.data._id === skill.data.data.relatedAbilityId);
        if (!relatedAbility)
          break;

        if (!options.fromActorUpdateEmbeddedEntity)
          options.fromActorUpdateEmbeddedEntity = "skill";

        skill.updateRelatedAbility(relatedAbility, options);
        break;
    }
  }
}
