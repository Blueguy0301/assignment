export type countries = country[]
export type regions = "Asia" | "Africa" | "Americas" | "Polar" | "Europe" | "Oceania" | "Lithuania" | "none"
export interface country {
    name: string,
    region: regions
    area: number,
    independent: boolean

}
export type sortType = "Country (Asc.)" | "Country (Desc.)" | "Continent (Asc.)" | "Continent (Desc.)" | "Area (Asc.)" | "Area (Desc.)"
export const sorts: sortType[] = ["Country (Asc.)", "Country (Desc.)", "Continent (Asc.)", "Continent (Desc.)", "Area (Asc.)", "Area (Desc.)",]
export const regions: regions[] = ["none", "Asia", "Africa", "Americas", "Polar", "Europe", "Oceania"] 