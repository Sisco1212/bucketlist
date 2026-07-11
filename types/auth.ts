export interface ActionState<T = Record<string, string[]>> {
  success: boolean;
  message: string;
  errors?: T;
}

export type AuthState = ActionState<{
  username?: string[];
  email?: string[];
  password?: string[];
}>;