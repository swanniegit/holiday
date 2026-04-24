export interface HotelImage {
  orderIndex?: number;
  dimensions: string;
  imageURL: string;
}

export interface ProductImage {
  imageURL: string;
}

export interface RatePackage {
  packageDesc: string;
  packagePriceZARFrom: number;
  pricePerPersonZARFrom: number;
}

export interface RatesRate {
  identity: string;
  bcReference: string;
  bookingFromDate: string;
  bookingToDate: string;
  travelFromDate: string;
  travelToDate: string;
  country: string;
  includeAir: boolean;
  carrierCode: string;
  departFrom: string;
  hotelName: string;
  hotelDescription: string;
  hotelInfoAddress: string;
  hotelGalleryAddress: string;
  hotelImages: HotelImage[];
  accomProductName: string;
  accomProdDescription: string;
  roomAllocation: string;
  roomStatus: string;
  totalPax: number;
  numberOfNights: number;
  accSpecial1: string;
  importantNotes: string;
  transferType: string;
  packages: RatePackage[];
  productImages: ProductImage[];
  packageInclusions: { inclusion: string }[];
  packageExclusions: { exclusion: string }[];
  beachcomberPlusFactors: { plusFactor: string }[];
  termsAndConditions: { tCItem: string }[];
}

export interface RatesResponse {
  lastRatesUpdate: string;
  beachcomberRates: RatesRate[];
}

export interface QuoteRequest {
  hotelCode: string;
  dateDeparture: string;
  dateReturn: string;
  departureCity: string;
  includeAir: string;
  flightAdvanced: string;
  flightCabin: string;
  honeymoonRates: string;
  repeaterRates: string;
  weddingRates: string;
  weddingDate: string;
  nbrAdults: number;
  nbrChildren: number;
  nbrInfants: number;
  infantDOB1?: string;
  infantDOB2?: string;
  [key: string]: string | number | undefined;
}

export interface AirOption {
  operatingCarrier: string;
  flightRefNr: string;
  cabin: string;
  fromArpt: string;
  toArpt: string;
  depDateTime: string;
  arrDateTime: string;
  requestReference: string;
}

export interface RoomOption {
  sendQuoteReferences: string;
  accomProductName: string;
  accomProdDescription: string;
  roomAllocation: string;
  roomStatus: string;
  totalPax: number;
  numberOfNights: number;
  accSpecial1: string;
  importantNotes: string;
  productImages: ProductImage[];
  packages: RatePackage[];
}

export interface QuoteResponse {
  errorMsg?: string;
  hotelName: string;
  hotelDescription: string;
  quoteRef: string;
  transferProductRef: string;
  hotelImages: HotelImage[];
  travelFromDate: string;
  travelToDate: string;
  honeymoonRates: boolean;
  airGDS: AirOption[];
  roomOptions: RoomOption[];
  inclusions: string[];
}

export interface SendQuoteRequest {
  quoteRequestObjRef: string;
  quoteRefList: string;
  gdsRequestReference: string;
  transferProductRef: string;
  clientReference?: string;
  firstname: string;
  surname: string;
  emailAddress: string;
  mobilePhone: string;
}

export interface SendQuoteResponse {
  quoteNumber: string;
}

export interface EnquiryPayload {
  packageName?: string;
  name: string;
  surname: string;
  travelDates: string;
  adults: number;
  children: number;
  departureCity: string;
  budget?: string;
  starGrading?: string;
  specialOccasion?: string;
  additionalInfo?: string;
}
