import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { map, mergeMap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Tokens } from '../models/token.model';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.models';
import { Observable, of, Subscription, timer } from 'rxjs';

const TOKEN_KEY = 'token_key';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private injector: Injector,
        private http: HttpClient
    ) {
    }

    public expiresAt: number;
    private accessToken: string;

    private isLoggedIn = new ReplaySubject<boolean>(1);
    isLoggedIn$ = this.isLoggedIn.asObservable();

    private refreshSubscription: Subscription;

    public getAccessToken() {
        return this.accessToken;
    }

    setTokens(tokens: Tokens): void {
        this.injector.get(StorageService).setItemSync(TOKEN_KEY, tokens, true);
        this.setSession(tokens);
    }

    removeTokens(): void {
        this.injector.get(StorageService).removeItem(TOKEN_KEY);
    }

    getTokens() {
        return localStorage.getItem(TOKEN_KEY);
    }

    getTokensSync() {
        return this.injector.get(StorageService).getItemSync(TOKEN_KEY, true);
    }

    setSession(tokens: Tokens): void {
        const helper = new JwtHelperService();
        const { access_token, expires_in } = tokens;

        const decodedAccessToken = helper.decodeToken(access_token);
        const expiresAt = expires_in * 1000 + new Date().getTime();

        this.expiresAt = expiresAt;
        this.accessToken = access_token;
        this.isLoggedIn.next(this.isAuthenticated());
        this.scheduleRenewal();
        console.log(access_token);
    }

    login(identity: string, password: string) {
        const httpOptions = {
            headers: new HttpHeaders()
        };

        const body = {
            identity,
            password
        };

        return this.injector.get(ApiService).post(`${environment.API_URL}/api/login`, body, httpOptions).pipe(map(this.getData));
    }

    refreshAccessToken(tokens: Tokens) {
        const helper = new JwtHelperService();

        if (tokens.refresh_token && !helper.isTokenExpired(tokens.access_token)) {
            this.accessRefreshToken(tokens.refresh_token)
                .subscribe(
                    (newTokens) => {
                        this.setTokens(newTokens);
                    },
                    (error) => {
                        this.logout();
                    }
                );
        } else {
            this.logout();
        }
    }

    private accessRefreshToken(refreshToken: string): Observable<Tokens> {
        const httpOptions = {
            headers: new HttpHeaders()
        };

        const body = {
            refresh_token: refreshToken,
        };

        return this.http.post(`${environment.API_URL}/api/token-refresh`, body).pipe(
            map(this.getData)
        );
    }

    checkAuthenticated() {
        const tokens = this.getTokensSync();
        if (!tokens) {
            this.isLoggedIn.next(false);
            return;
        }

        const helper = new JwtHelperService();
        if (tokens.access_token && helper.isTokenExpired(tokens.access_token)) {
            this.refreshAccessToken(tokens);
        } else if (tokens.access_token) {
            this.setSession(tokens);
        }
        return;
    }

    logout() {
        this.removeTokens();
        window.location.href = '/login';
    }

    scheduleRenewal() {
        const source = of(this.expiresAt).pipe(
            mergeMap(
                expires => {
                    const now = Date.now();
                    const refreshAt = expires - (1000 * 60 * 3);
                    return timer(Math.max(1, refreshAt - now));
                }
            )
        );

        this.refreshSubscription = source.subscribe(() => {
            const tokens = this.getTokensSync();
            this.refreshAccessToken(tokens);
        });
    }

    public unscheduleRenewal(): void {
        if (!this.refreshSubscription) {
            return;
        }
        this.refreshSubscription.unsubscribe();
    }

    public isAuthenticated(): boolean {
        return new Date().getTime() < this.expiresAt;
    }

    public getToken(res: any): Tokens {
        if (res) {
            return res;
        }
    }

    private getData(res: any) {
        if (res) {
            return res.data;
        }
    }
}
