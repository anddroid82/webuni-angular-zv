export class Chart1 {
    country:string ='';
    death: number = 0;
    population: number = 0;
    area: number = 0;

    constructor(c:string,d:number,p:number,a:number) {
        this.country=c;
        this.death=d;
        this.population=p;
        this.area=a;
    }
}