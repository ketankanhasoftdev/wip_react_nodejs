export interface Props  {
  children: string | JSX.Element | JSX.Element[] 
}
export interface AuthInputs{
  name?:string|null|undefined
  password?:string|null|undefined
  email?:string|null|undefined
  navigate?:any
}

export interface UserType{
  id?:string
  _id?:string|null|undefined;
  name:string|null|undefined;
  email:string|null|undefined;
  password:string|null|undefined;
}

