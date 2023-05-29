export const userSchema = 
`type User {
    _id: ID!,
    username: String!
    email : String!
    password : String
    firstName : String!
    lastName : String!
  }
  
  input UserInput {
    username: String!
    email : String!
    password : String
    firstName : String!
    lastName : String!    
  }
  
  type AuthData{
    userId : ID!
    token: String!
    tokenExpiration: Int!
  }`