export interface User {
    user_id: string;
    fname: string;
    lname: string;
    CohortNo: number; 
    email: string;
    phoneNumber: string;
    gender: string;
    password: string;
}





export interface loginUserDetails{
        
        userId: string;
        name: string;
        email: string;
        nationalId: string;
        phoneNumber: string;
        dateOfBirth: Date;
        location: string;
        gender: string;
        nationality: string;
        occupation: string;
        // password: string;
    
    
}