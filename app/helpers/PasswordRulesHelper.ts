export class PasswordRulesHelper {
    private symbols: boolean | null = null;
    private upperCase: boolean | null = null;


    checkConfirmation(password: string, password_confirmation: string): boolean {
        if (password !== password_confirmation) {
            return false;
        }

        return true;
    }
    checkLength(min_length: number, password: string): boolean {
        if (password.length < min_length) {
            return false;
        }

        return true;
    }

    check(password: string): boolean | any {
        if (password.match(/^(?=.*\d)(?=.*["'!@#$%¨&*()_+<.|>])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) === null) {
            return false;
        }

        return true;

    }
}
