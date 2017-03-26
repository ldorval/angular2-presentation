import {TestBed, inject} from '@angular/core/testing';
import {AppComponent} from "../../app/components/app.component";
import {AccountService} from "../../app/services/account.service";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../../app/app.module";

describe('AppComponent', () => {
    let component: AppComponent;
    let accountServiceMock: AccountService;

    beforeEach(() => {
        accountServiceMock = new AccountService();
        spyOn(accountServiceMock, "deposit");

        TestBed.configureTestingModule({
            imports: [AppModule,FormsModule],
        }).overrideComponent(AppComponent, {
            set: { providers: [{provide: AccountService, useValue: accountServiceMock}] }
        }).compileComponents();

        let fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
    });

    describe("when depositing money", () => {
        it("should relay to the account service", () => {
            component.transfer = "12";
            component.deposit();

            expect(accountServiceMock.deposit).toHaveBeenCalledWith(12);
        });

        it("should reset the transfer amount after the deposit", () => {
            component.transfer = "12";
            component.deposit();

            expect(component.transfer).toEqual("");
        });
    });

    describe("when withdrawing money", () => {
        it("should relay to the account service", () => {
            spyOn(accountServiceMock, "withdraw");
            component.transfer = "12";
            component.withdraw();

            expect(accountServiceMock.withdraw).toHaveBeenCalledWith(12);
        });

        it("should reset the transfer amount after the withdraw", () => {
            spyOn(accountServiceMock, "withdraw");
            component.transfer = "12";
            component.withdraw();

            expect(component.transfer).toEqual("");
        });

        it("should display an error message when the service refuse the transaction", () => {
            spyOn(accountServiceMock, "withdraw").and.throwError("There was an error");
            component.transfer = "12";
            component.withdraw();

            expect(component.error).toEqual("There was an error");
        });
    });
});
