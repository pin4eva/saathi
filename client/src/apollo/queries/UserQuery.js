import { gql } from "@apollo/client";

export const GET_USERS = gql`
{
    id
    name
    email
    username
}

`

export const LOGIN = gql`

mutation Login($email:String,$password:String) {
 login (email:$email,password: $password){
     token
     id
     name
     email
     
 }
}

`

export const SIGNUP = gql`

mutation signup($input:UserInput){
    signup(input:$input){
        id
        name
        email
        username
    }
}

`

export const GET_AUTH = gql`
{
    auth {
        id
        name
        email
        username
    }
}

`