export class User {

    constructor(

        public id: string,
        public email: string,
        public password: string,
        public name: string,
        public lastname: string,
        public active: Boolean,
        public role: string,

    ) {}

}