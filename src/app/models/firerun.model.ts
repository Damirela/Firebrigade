export class Firerun {
    constructor(
        public id: number,
        public description: string,
        public participators: number = 0,
        public created: Date = undefined
    ) {
        if (created === undefined) {
            this.created = new Date();
        }
    }
}
