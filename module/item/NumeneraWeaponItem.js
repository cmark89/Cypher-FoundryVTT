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
            itemData.name = this.data.name || "New Weapon";

        itemData.damage = itemData.damage || 1;
        itemData.range = itemData.range || CYPHER.ranges[0];
        itemData.weaponType = itemData.weaponType || CYPHER.weaponTypes[0];
        itemData.weight = itemData.weight || CYPHER.weightClasses[0];
        itemData.notes = itemData.notes || "";

        itemData.ranges = CYPHER.ranges;

        itemData.weightClasses = CYPHER.weightClasses.map(weightClass => {
            return {
                label: weightClass,
                checked: weightClass === itemData.weight,
            }
        });

        itemData.weaponTypes = CYPHER.weaponTypes.map(weaponType => {
            return {
                label: weaponType,
                checked: weaponType === itemData.type,
            }
        });
    }
}