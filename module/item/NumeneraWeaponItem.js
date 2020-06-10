import { NumeneraSkillItem } from "./NumeneraSkillItem.js";
import { CYPHER } from '../config.js';

export class NumeneraWeaponItem extends Item {

    get type() {
        return "weapon";
    }

    prepareData() {
	    // Override common default icon
	    if (!this.data.img) this.data.img = 'icons/svg/sword.svg';
		
        super.prepareData();

        let itemData = this.data.data || {};

        //TODO we're duplicating the name here... why is that?
        const desc = Object.getOwnPropertyDescriptor(itemData, "name");
        if (desc && desc.writable)
            itemData.name = this.data.name || game.i18n.localize("CYPHER.item.weapon.newWeapon");

        itemData.damage = itemData.damage || 1;
        itemData.range = itemData.range || CYPHER.ranges[0];
        itemData.weaponType = itemData.weaponType || CYPHER.weaponTypes[0];
        itemData.weight = itemData.weight || CYPHER.weightClasses[0];
        itemData.notes = itemData.notes || "";

        itemData.ranges = CYPHER.ranges;

        itemData.weightClasses = Object.entries(CYPHER.weightClasses).map(entry => {
            const [weightClass, label] = entry;
            return {
                weightClass,
                label,
                checked: weightClass === itemData.weight,
            }
        });

        itemData.weaponTypes = Object.entries(CYPHER.weaponTypes).map(entry => {
            const [weaponType, label] = entry;
            return {
                weaponType,
                label,
                checked: weaponType === itemData.type,
            }
        });
    }

    async use() {
        //An ability must be related to an Actor to be used
        if (this.actor === null) {
          return ui.notifications.error(game.i18n.localize("CYPHER.item.ability.useNotLinkedToActor"));
        }

        const skillName = `${game.i18n.localize(this.data.data.weight)} ${game.i18n.localize(this.data.data.weaponType)}`;
    
        //Get the skill related to that ability
        let skill = this.actor.data.items.find(
          i => i.name === skillName && i.type === NumeneraSkillItem.type
        );

        if (!skill) {
            skill = new NumeneraSkillItem();
            skill.data.name = `${game.i18n.localize(this.data.data.weight)} ${game.i18n.localize(this.data.data.weaponType)}`;
        }

        this.actor.rollSkill(skill);
      }
}