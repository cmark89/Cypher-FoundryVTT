export class NumeneraNpcAttackItem extends Item {
  get type() {
      return "npcattack";
  }

  prepareData() {     
    super.prepareData();

    const itemData = this.data.data || {};

    itemData.notes = itemData.notes || "";
    itemData.info = itemData.info || "";
  }
}