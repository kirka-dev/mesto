export class UserInfo {
    constructor(userName, userInfo, userAvatar) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userAvatar = userAvatar;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}