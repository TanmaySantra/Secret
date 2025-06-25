
export class SecretValues{ 
    
 private SECRET : string;
 private HOST: string;
 private DBPORT: number;
 private DBUSER: string;
 private PASSWORD: string;
 private DATABASE: string;
 private SYNCHRONIZE:boolean;
 private SSL:boolean;
 private GLOBAL:boolean;

 constructor() {
    this.SECRET=process.env.JWT_SECRET as string
    this.HOST= process.env.HOST as string
    this.DBPORT=  Number(process.env.DBPORT)
    this.DBUSER= process.env.DBUSER as string
    this.PASSWORD= process.env.PASSWORD as string
    this.DATABASE= process.env.DATABASE as string
    console.log("boolean value", Boolean(process.env.SYNCHRONIZE))
    this.SYNCHRONIZE=  Boolean(process.env.SYNCHRONIZE)
    this.SSL= Boolean(process.env.SSL)
    this.GLOBAL=Boolean(process.env.GLOBAL)
 }
 getSecret(){
    return {
        secret:this.SECRET,
        host:this.HOST,
        dbport:this.DBPORT,
        password:this.PASSWORD,
        dbuser:this.DBUSER,
        database:this.DATABASE,
        synchronize:this.SYNCHRONIZE,
        ssl:this.SSL,
        global:this.GLOBAL,
    }
}

}
