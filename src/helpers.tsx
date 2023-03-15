import type { countries, sortType, regions } from "./types"

export const getCountries = async () => {
	const cache: string | null = localStorage.getItem("countries")
	if (cache) return JSON.parse(cache) as countries
	const countries: countries = await fetch(
		"https://restcountries.com/v2/all?fields=name,region,area"
	).then((res) => res.json())
	localStorage.setItem("cache", JSON.stringify(countries))
	return countries
}
export const sortAsc = (data: countries) => {
	const cache = localStorage.getItem("sortAsc")
	if (cache) return JSON.parse(cache) as countries
	const res = data.sort((a, b) => a.name.localeCompare(b.name))
	localStorage.setItem("sortAsc", JSON.stringify(res))
	// console.log(res)
	return res
}

export const searchCountries = (data: countries) => {}
export const sortDesc = (data: countries) => {
	const cache = localStorage.getItem("sortDesc")
	if (cache) return JSON.parse(cache) as countries
	const res = data.sort(
		(a, b) => -a.name.localeCompare(b.name, undefined, { numeric: true })
	)
	localStorage.setItem("sortDesc", JSON.stringify(res))
	return res
}
export const sortArea = (data: countries) => {}
export const sortContinentAsc = (data: countries) => {
	const cache = localStorage.getItem("sortContinentAsc")
	if (cache) return JSON.parse(cache) as countries
	const res = data.sort((a, b) => a.region.localeCompare(b.region))
	localStorage.setItem("sortContinentAsc", JSON.stringify(res))
	return res
}
export const sortContinentDesc = (data: countries) => {
	const cache = localStorage.getItem("sortContinentDesc")
	if (cache) return JSON.parse(cache) as countries
	const res = data.sort((a, b) => {
		if (a.region < b.region) return 1
		if (a.region > b.region) return -1
		else return 0
	})
	localStorage.setItem("sortContinentDesc", JSON.stringify(res))
	return res
}
export const classNames: (...classes: string[]) => string = (...classes) => {
	return classes.filter(Boolean).join(" ")
}
export const filterCountries = (data: countries, filterOptions: regions) => {}
