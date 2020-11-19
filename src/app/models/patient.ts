export class Patient {
    constructor(
        public name: string,
        public apaterno: string,
        public amaterno: string,
        public dni: string,
        public job: string,
        public telephone: string,
        public birth_date: string,
        public company: string,
        public district: string,
        public start_date: Date,
        public origin: string,
        public control: string,
    ) {}
}