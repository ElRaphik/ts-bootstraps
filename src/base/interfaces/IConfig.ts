export default interface IConfig {
    clientId: string
    clientSecret: string
    oauthRedirectUrl: string
    userAccessToken: string
    refreshToken: string

    botUsername: string
    watchedChannel: string
    prefix: string

    devUserIds: string[]
    devUsernames: string[]
}