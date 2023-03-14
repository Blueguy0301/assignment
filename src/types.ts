export type countries = country[]
export interface country {
    name: string,
    region: "Asia" | "Africa" | "Americas" | "Polar" | "Europe" | "Oceania",
    area: number,
    independent: boolean

}