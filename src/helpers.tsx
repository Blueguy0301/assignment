import type { countries, sortType } from "./types"

export const helpers = () => {
	return "helpers"
}
export const getCountries = async () => {
	const countries: countries = await fetch(
		"https://restcountries.com/v2/all?fields=name,region,area"
	).then((res) => res.json())
	return countries
}
export const sortAsc = (data: countries) => {}
export const searchCountries = (data: countries) => {}
export const sortDesc = (data: countries) => {}
export const sortArea = (data: countries) => {}
export const sortContinent = (data: countries) => {}
export const classNames: (...classes: string[]) => string = (...classes) => {
	return classes.filter(Boolean).join(" ")
}
