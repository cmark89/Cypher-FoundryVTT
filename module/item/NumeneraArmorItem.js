export class NumeneraArmorItem extends Item {
    get type() {
        return "armor";
    }

    prepareData() {
        // Override common default icon
        if (!this.data.img) this.data.img = 'icons/svg/statue.svg';

        super.prepareData();

        const itemData = this.data.data || {};

        itemData.name = this.data ? this.data.name : game.i18n.localize("CYPHER.item.armor.description");
        itemData.armor = itemData.armor || 0;
        itemData.weight = itemData.weight || "Light";
        itemData.effect = itemData.price || 0;
        itemData.notes = itemData.notes || "";
        itemData.additionalSpeedEffortCost = itemData.additionalSpeedEffortCost || 0;
    }
}