import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
    private balance: number = 0;

    getBalance(){
        return this.balance;
    }

    deposit(amount: number){
        this.balance += amount;
    }

    withdraw(amount: number){
        if (this.balance - amount < 0){
            throw new Error("Inssuficient funds");
        }

        this.balance -= amount;
    }
}
