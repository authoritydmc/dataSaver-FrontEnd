export class FileData {
    name: string = '';
    type: string = '';
    data: string = '';
    userID: string = '-1';

    constructor(name:string,type:string,data:string,userID:string)
    {
        this.name = name;
        this.userID=userID;
        this.type = type;
        this.data=data;
    }
}