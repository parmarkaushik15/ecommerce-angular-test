import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  onlineStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);
  public onlineStatus$: Observable<boolean> = this.onlineStatusSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.initializeNetworkStatusListener();
  }

  private initializeNetworkStatusListener() {
    this.ngZone.runOutsideAngular(() => {
      const online$ = fromEvent(window, 'online').pipe(map(() => true));
      const offline$ = fromEvent(window, 'offline').pipe(map(() => false));

      merge(online$, offline$).subscribe((status: boolean) => {
        this.ngZone.run(() => {
          this.onlineStatusSubject.next(status);
        });
      });
    });
  }
}
