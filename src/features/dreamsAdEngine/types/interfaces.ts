export interface Googletag {
  cmd: Array<() => void>;
  pubads: () => PubAdsService;
  defineSlot: (
    adUnitPath: string,
    size: Array<number> | Array<Array<number>>,
    divId: string
  ) => Slot;
  display: (divId: string) => void;
  enableServices: () => void;
}

interface PubAdsService {
  disableInitialLoad: () => void;
  enableSingleRequest: () => void;
  refresh: (slots?: Slot[]) => void;
  addService: (service: ServiceType) => Slot;
}

interface Slot {
  setTargeting: (key: string, value: string) => Slot;
  addService: (service: ServiceType) => Slot;
}

type ServiceType = PubAdsService;
declare global {
  interface Window {
    googletag: Googletag;
    dreamsSlotsToUpdate: Slot[];
    dreamsAllSlots: Slot[];
  }
}
