import {Component} from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
    selector: 'app-root',
    templateUrl: '../views/bank-account.html',
    providers: [AccountService]
})

export class AppComponent {
    balance = 0;
    transfer = "";
    error = "";

    constructor(private accountService: AccountService){
        this.updateBalance();
    }

    private clearError() {
        this.error = "";
    }

    private updateBalance(){
        this.balance = this.accountService.getBalance();
    }

    deposit() {
        this.clearError();
        this.accountService.deposit(parseFloat(this.transfer));
        this.updateBalance();
        this.transfer = "";
    }

    withdraw() {
        this.clearError();

        try {
            this.clearError();
            this.accountService.withdraw(parseFloat(this.transfer));
            this.updateBalance();
            this.transfer = "";
        }
        catch (error) {
            this.error = error.message;
        }
    }
}
