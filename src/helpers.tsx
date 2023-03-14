import React from "react"
import { countries } from "./types"

export const helpers = () => {
	return "helpers"
}
export const getCountries = async () => {
	const countries = (await fetch(
		"https://restcountries.com/v2/all?fields=name,region,area"
	).then((res) => res.json())) as countries
	return countries
	console.log(countries)
}
