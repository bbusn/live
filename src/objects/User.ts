// import { PERMISSIONS } from '../constants/permissions';
// import ROUTES from '../constants/routes';

class User {
    public static _TYPE: string = 'User';

    public _username: string = '';

    public get username(): string {
        return this._username ?? '';
    }

    public set username(value: string) {
        this._username = value;
    }

    public static _instance = new User();
    private _auth = false;

    isAuth() {
        return this._auth ?? false;
    }

    // isAllowed(permissions: string | string[], allRequired: boolean = false): boolean {
    //     if (!this.isAuth()) return false;

    //     if (typeof permissions === 'string') {
    //         permissions = [permissions];
    //     }

    //     if (this.role && this.role.permissionList) {
    //         if (allRequired) {
    //             return permissions.every((permission) => this.role.permissionList.some((p) => p.name === permission));
    //         } else {
    //             return this.role.permissionList.some((permission) => permissions.includes(permission.name));
    //         }
    //     }

    //     return false;
    // }

    setAuth(auth: boolean) {
        this._auth = auth;
    }

    // login(result: any) {
    //     this.reset();
    //     this.applyResult(result, true);
    //     localStorage.setItem('accessToken', result.accessToken);
    //     localStorage.setItem('refreshToken', result.refreshToken);

    //     this.setAuth(true);
    // }

    // logout() {
    //     this.reset();
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     this.setAuth(false);
    // }
}

export default User;
