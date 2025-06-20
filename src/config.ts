
export class SecretValues{ 
    
 private SECRET : string;
 private HOST: string;
 private PORT: number;
 private USER: string;
 private PASSWORD: string;
 private DATABASE: string;
 private SYNCHRONIZE:boolean;
 private SSL:boolean;

 constructor() {
    this.SECRET=process.env.JWT_SECRET as string
    this.HOST= process.env.HOST as string
    this.PORT=  Number(process.env.PORT)
    this.USER= process.env.USER as string
    this.PASSWORD= process.env.PASSWORD as string
    this.DATABASE= process.env.DATABASE as string
    this.SYNCHRONIZE=  Boolean(process.env.SYNCHRONIZE)
    this.SSL= Boolean(process.env.SSL)
 }
 getSecret(){
    return {
        secret:this.SECRET,
        host:this.HOST,
        port:this.PORT,
        password:this.PASSWORD,
        user:this.USER,
        database:this.DATABASE,
        synchronize:this.SYNCHRONIZE,
        ssl:this.SSL
    }
}

}
