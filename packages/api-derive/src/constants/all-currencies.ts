import { ApiInterfaceRx } from '@polkadot/api/types';
import { memo } from '@polkadot/api-derive/util';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Vec } from '@polkadot/types';
import { CurrencyId } from '@reef-defi/types/interfaces';

function getNativeCurrencyId(api: ApiInterfaceRx): Observable<CurrencyId> {
  return api.rpc.system.properties().pipe(
    switchMap((properties) => {
      const nativeTokenSymbol = properties.tokenSymbol.unwrapOrDefault()[0].toString();

      return of(api.registry.createType('CurrencyId', api.registry.createType('TokenSymbol', nativeTokenSymbol)));
    })
  );
}

/**
 * @name nativeCurrencyId
 * @returns native currencyId
 */
export function nativeCurrencyId(instanceId: string, api: unknown): () => Observable<CurrencyId> {
  return memo(instanceId, () => {
    return getNativeCurrencyId(api as ApiInterfaceRx);
  });
}

/**
 * @name stakingCurrencyId
 * @returns staking currencyId in staking pool
 */

function getAllNonNativeCurrencyIds(api: ApiInterfaceRx): Vec<CurrencyId> {
  return api.consts.transactionPayment.allNonNativeCurrencyIds as unknown as Vec<CurrencyId>;
}

/**
 * @name allNonNativeCurrencyIds
 * @returns all nonnative currencyIds
 */
export function allNonNativeCurrencyIds(instanceId: string, api: unknown): () => Observable<Vec<CurrencyId>> {
  return memo(instanceId, () => {
    return of(getAllNonNativeCurrencyIds(api as ApiInterfaceRx));
  });
}

/**
 * @name allCurrencyIds
 * @returns all currencyIds includes stable curerncyId and all nonnative currencyIds
 */
export function allCurrencyIds(instanceId: string, api: unknown): () => Observable<CurrencyId[]> {
  return memo(instanceId, () => {
    return getNativeCurrencyId(api as ApiInterfaceRx).pipe(
      switchMap((nativeCurrencyId) => {
        return of([nativeCurrencyId, ...getAllNonNativeCurrencyIds(api as ApiInterfaceRx).slice()]);
      })
    );
  });
}
