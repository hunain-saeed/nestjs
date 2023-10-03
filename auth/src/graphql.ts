
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    index(): string | Promise<string>;
    securedResourceAdmin(): string | Promise<string>;
    securedResource(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
    signup(name: string, email: string, password: string, role: string): string | Promise<string>;
}

type Nullable<T> = T | null;
