// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types-codec';
import type { CurrencyId } from '@reef-defi/types/interfaces/primitives';

/** @name PoolId */
export interface PoolId extends Enum {
  readonly isLoans: boolean;
  readonly asLoans: CurrencyId;
  readonly isDexIncentive: boolean;
  readonly asDexIncentive: CurrencyId;
  readonly isDexSaving: boolean;
  readonly asDexSaving: CurrencyId;
  readonly isHoma: boolean;
  readonly type: 'Loans' | 'DexIncentive' | 'DexSaving' | 'Homa';
}

export type PHANTOM_INCENTIVES = 'incentives';
