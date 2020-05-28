export class HorrorMode {
    static active = false;
    static currentHorrorLevel = 1;

    static get isActive() {
        return HorrorMode.active;
    }

    static setActive(value) {
        HorrorMode.active = value;
    }

    static setHorrorLevel(value) {
        HorrorMode.currentHorrorLevel = value;
    }

    static get horrorLevel() {
        return HorrorMode.currentHorrorLevel;
    }

    static escalate() {
        HorrorMode.currentHorrorLevel = Math.min(HorrorMode.currentHorrorLevel + 1, 20);
    }

    static reset() {
        HorrorMode.currentHorrorLevel = 1;
    }
}