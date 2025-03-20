import { OfferTypeEnum } from './offer-type.enum';
import { OnlyAdditionTypeEnum } from './only-addition-type.enum';
import { OnlyPaymentTypeEnum } from './only-payment-type.enum';
import { TimerTypeEnum } from './timer-type.enum';
import { UsualBlockTypeEnum } from './usual-block-type.enum';

export type ContructorTypeEnum =
  OfferTypeEnum |
  UsualBlockTypeEnum |
  TimerTypeEnum |
  OnlyPaymentTypeEnum |
  OnlyAdditionTypeEnum;
