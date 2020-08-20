export type RolesTypes = 'user' | 'superuser' | 'admin'
export type Language = 'pl' | 'en'
export type LogerModeTypes = 'login' | 'register'
export type UserType = {
  _id: string | undefined
  email: string | undefined
  roles: RolesTypes[]
  name: string | undefined
}
export type ImageType = {
  src: string
  alt: string
}
