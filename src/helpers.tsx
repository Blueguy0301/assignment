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
export const sortAsc = (data: countries, order: "asc" | "desc") => {
	const cache = localStorage.getItem(`sortCountry ${order}`)
	if (cache) return JSON.parse(cache) as countries
	const res =
		order === "asc"
			? data.sort((a, b) => a.name.localeCompare(b.name))
			: data.sort((a, b) => -a.name.localeCompare(b.name, undefined, { numeric: true }))
	localStorage.setItem(`sortCountry ${order}`, JSON.stringify(res))
	console.log("currentCountry's size ", res.length)
	return res
}

export const sortArea = (data: countries, order: "asc" | "desc") => {
	const cache = localStorage.getItem(`sortArea ${order}`)
	if (cache) return JSON.parse(cache) as countries
	const res =
		order === "asc"
			? data.sort((a, b) => b.area - a.area)
			: data.sort((a, b) => a.area - b.area)
	localStorage.setItem(`sortArea ${order}`, JSON.stringify(res))
	console.log("currentCountry's size ", res.length)

	return res
}
export const sortContinent = (data: countries, order: "asc" | "desc") => {
	const cache = localStorage.getItem(`sortContinent ${order}`)
	if (cache) return JSON.parse(cache) as countries
	const res =
		order === "asc"
			? data.sort((a, b) => a.region.localeCompare(b.region))
			: data.sort((a, b) => {
					if (a.region < b.region) return 1
					if (a.region > b.region) return -1
					else return 0
			  })
	localStorage.setItem(`sortContinent ${order}`, JSON.stringify(res))

	return res
}
export const classNames: (...classes: string[]) => string = (...classes) => {
	return classes.filter(Boolean).join(" ")
}
export const filterCountries = (data: countries, filterOptions: regions) => {
	const cache = localStorage.getItem(filterOptions)
	if (cache) return JSON.parse(cache) as countries
	// console.log(data)
	if (filterOptions === "none") return data
	if (filterOptions === "Lithuania")
		return data.filter((a) => a.area < 65300).sort((a, b) => a.area - b.area)
	const filteredData = data.filter((a) => a.region === filterOptions)
	localStorage.setItem(filterOptions, JSON.stringify(filteredData))
	console.log("currentCountry's size ", filteredData.length)

	return filteredData
}
export const wordsearch = (data: countries, search: string) => {
	return data.filter((a) => {
		const words = a.name.toLowerCase().split(" ")
		return words.some((word) => word.startsWith(search.toLowerCase()))
	})
}
