import {AccountService} from "../../app/services/account.service";

describe('AccountService', () => {
    var accountService: AccountService;

    beforeEach(() =>{
        accountService = new AccountService();
    });

    describe("when initializing the account", () => {
        it("should set the account balance to 0", () =>{
            expect(accountService.getBalance()).toEqual(0);
        });
    });

    describe("when depositing money", () => {
        it("should add the amount to the balance", () => {
            accountService.deposit(230);
            expect(accountService.getBalance()).toEqual(230);
        });
    });

    describe("when withdrawing money", () => {
        it("should remove the amount from the balance", () => {
            accountService.deposit(230);
            accountService.withdraw(100);

            expect(accountService.getBalance()).toEqual(130);
        });

        it("should not remove the amount from the balance when there is insufficient funds", () => {
            accountService.deposit(230);

            expect(() => { accountService.withdraw(250); }).toThrow(new Error("Inssuficient funds"));
        });
    });
});
