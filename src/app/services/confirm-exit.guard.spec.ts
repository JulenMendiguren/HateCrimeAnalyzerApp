import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmExitGuard } from './confirm-exit.guard';

describe('ConfirmExitGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfirmExitGuard]
        });
    });

    it('should ...', inject([ConfirmExitGuard], (guard: ConfirmExitGuard) => {
        expect(guard).toBeTruthy();
    }));
});
