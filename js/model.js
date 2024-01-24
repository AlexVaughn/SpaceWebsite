class Visitor {
    constructor(id, firstName, lastName, address, city, state, zip, phone, email, howFound, notes){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
        this.howFound = howFound;
        this.notes = notes;
    }
    get fullName(){ 
        return this.firstName + " " + this.lastName
    }
    get fullAddress() {
        return this.address + ", " + this.city + " " + this.state + " " + this.zip
    }
}
 
let visitors = [ 
    new Visitor(1,"Ken","Jenson","1234 W. Main St.","Mapleton","UT","84664","444-5555","ken@gmail.com",{google:true,yahoo:false,friend:true}, "notes"),
    new Visitor(2,"Alex","Vaughn","732 E. Joad","Newland","OH","65893","069-4200","av@gmail.com",{google:true,yahoo:false,friend:true}, "Incredible."),
    new Visitor(3,"Ariana","Grande","420 E. 1880 N","Los Angeles","CA","77769","789-1462","ari@gmail.com",{google:true,yahoo:true,friend:false}, "Best website of the year."),
    new Visitor(4,"Ben","Jenson","6789 W. Pancake St.","Mapleton","UT","84664","552-1167","ben@gmail.com",{google:true,yahoo:false,friend:false}, "notes"),
    new Visitor(5,"Margot","Robbie","601 W. Poppy St.","Kangaroo","AZ","69420","345-5445","margot@gmail.com",{google:false,yahoo:false,friend:true}, "Wow!")
];

//adds new visitor object to your array
function modelAddVisitor(visitor) {
    visitors.push(visitor);
}

//removes visitor object with given 'id' from array
function modelDeleteVisitor(id) {
    for (i = 0; i < visitors.length; i++){
        if (visitors[i].id == id){
            visitors.splice(i, 1);
            break;
        }
    }
}

//returns visitor object with given 'id' from arra
function findVisitor(id) {
    for (i = 0; i < visitors.length; i++){
        if (visitors[i].id == id){
            return visitors[i]
        }
    }
}

//returns index in the array of the visitor object with given 'id'
function findVisitorIndex(id) {
    for (i = 0; i < visitors.length; i++){
        if (visitors[i].id == id){
            return i
        }
    }
}

//updates a visitor object
function modelUpdateVisitor(visitorOLD, visitorNEW){
    visitors[findVisitorIndex(visitorOLD.id)] = visitorNEW;
}

//finds a number that isn't already being used as an id
function genNewID(){
    newID = 1;
    exists = false;
    while (true){
        for (i = 0; i < visitors.length; i++){
            if (visitors[i].id == newID){
                exists = true;
                break;
            }
        }
        if (exists){
            exists = false;
            newID += 1;
        }
        else{
            return newID
        }
    }
}