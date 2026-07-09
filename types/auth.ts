// export interface RegisterUser {
//   username: string;
//   email: string;
//   password: string;
// }

// export interface LoginUser {
//   email: string;
//   password: string;
// }


export interface ActionState<T = Record<string, string[]>> {
  success: boolean;
  message: string;
  errors?: T;
}


// export interface AuthState {
//   success: boolean;
//   message: string;
//   errors?: {
//     username?: string[];
//     email?: string[];
//     password?: string[];
//   };
// }
type AuthState = ActionState<{
  username?: string[];
  email?: string[];
  password?: string[];
}>;